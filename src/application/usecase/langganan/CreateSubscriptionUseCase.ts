import midtransClient from "midtrans-client";
import crypto from "crypto";
import { SubscriptionRepository } from "@infrastructure/repositories/langganan/subscription";
import { PackageRepository } from "@infrastructure/repositories/paket/PackageRepository";
import { AppError } from "@shared/errors/AppError";
import { config } from "@config/env";
import PaymentLogModel from "@infrastructure/database/models/langganan/PaymentLogModel";
import { UserModel, CompanyModel } from "@infrastructure/database/models";

export interface CreateSubscriptionDTO {
  userId: string;
  companyId: string;
  packageId: string;
  duration: number; // dalam hari/bulan sesuai kebutuhan
}

export class CreateSubscriptionUseCase {
  constructor(
    private repo: SubscriptionRepository,
    private packageRepo: PackageRepository
  ) { }

  async execute(dto: CreateSubscriptionDTO) {
    const { userId, companyId, packageId, duration } = dto;

    // Ambil data paket
    const selectedPackage = await this.packageRepo.findById(packageId);
    if (!selectedPackage) throw new AppError("Package not found", 404);

    // Ambil data user & company
    const user = await UserModel.findByPk(userId);
    if (!user) throw new AppError("User not found", 404);

    const company = await CompanyModel.findByPk(companyId);
    if (!company) throw new AppError("Company not found", 404);

    const grossAmount = selectedPackage.price * duration;

    // Generate orderId unik
    const shortCompany = companyId.slice(0, 8);
    const shortUser = userId.slice(0, 8);
    const timestamp = Date.now();
    const orderId = `ORDER-${shortCompany}-${shortUser}-${timestamp}`;

    // Buat transaksi Midtrans
    const snap = new midtransClient.Snap({
      isProduction: config.isProd,
      serverKey: config.MIDTRANS_SERVER_KEY,
      clientKey: config.MIDTRANS_CLIENT_KEY,
    });

    // Parameter lengkap ke Midtrans
    const parameter = {
      transaction_details: {
        order_id: orderId,
        gross_amount: grossAmount,
      },
      customer_details: {
        first_name: user.firstName + user.lastName,
        last_name: "",
        email: user.email,
        phone: user.phone,
        shipping_address: {
          first_name: user.name,
          last_name: "",
          phone: user.phone,
          address: company.address || "",
          country_code: "IDN",
        },
      },
      item_details: [
        {
          id: selectedPackage.id,
          price: selectedPackage.price,
          quantity: duration,
          name: selectedPackage.name,
        },
      ],
    };

    const transaction = await snap.createTransaction(parameter);

    // Simpan log pembayaran di database
    await this.repo.createPaymentLog({
      userId,
      companyId,
      orderId,
      grossAmount,
      packageId,
      duration,
      transactionStatus: "PENDING",
      customerDetails: { userId, companyId },
      productDetails: { packageId, duration, price: selectedPackage.price },
    });

    return {
      status: "success",
      redirectUrl: transaction.redirect_url,
      orderId,
      userId,
      companyId,
      packageId,
      duration,
      grossAmount,
    };
  }

  /**
   * Verify Midtrans callback signature
   * Signature = SHA512(order_id + status_code + gross_amount + server_key)
   */
  private verifySignature(payload: any): boolean {
    const { order_id, status_code, gross_amount, signature_key } = payload;

    if (!order_id || !status_code || !gross_amount || !signature_key) {
      return false;
    }

    const serverKey = config.MIDTRANS_SERVER_KEY;
    const signatureString = `${order_id}${status_code}${gross_amount}${serverKey}`;
    const expectedSignature = crypto
      .createHash("sha512")
      .update(signatureString)
      .digest("hex");

    return signature_key === expectedSignature;
  }

  // Handle callback Midtrans
  async handleCallback(payload: any) {
    console.log("[MIDTRANS CALLBACK] Received payload:", JSON.stringify(payload, null, 2));

    // Verify signature to prevent spoofing
    if (!this.verifySignature(payload)) {
      console.error("[MIDTRANS CALLBACK] Signature verification FAILED");
      throw new AppError("Invalid signature", 403);
    }
    console.log("[MIDTRANS CALLBACK] Signature verification PASSED");

    const { order_id, transaction_status } = payload;
    let status = "PENDING";

    switch (transaction_status) {
      case "settlement":
      case "capture":
        status = "SUCCESS";
        break;
      case "cancel":
      case "deny":
      case "expire":
        status = "FAILED";
        break;
    }

    console.log(`[MIDTRANS CALLBACK] Order: ${order_id}, Transaction Status: ${transaction_status}, Mapped Status: ${status}`);

    // Update status pembayaran di database
    await this.repo.updatePaymentStatus(order_id, status);
    console.log(`[MIDTRANS CALLBACK] Payment status updated to ${status}`);

    if (status === "SUCCESS") {
      const paymentLog: any = await PaymentLogModel.findOne({
        where: { orderId: order_id },
      });

      console.log("[MIDTRANS CALLBACK] PaymentLog found:", paymentLog ? {
        id: paymentLog.id,
        userId: paymentLog.userId,
        companyId: paymentLog.companyId,
        packageId: paymentLog.packageId,
        duration: paymentLog.duration,
      } : null);

      if (paymentLog) {
        const endDate = new Date();
        endDate.setMonth(endDate.getMonth() + paymentLog.duration); // Use actual duration from payment log

        // Aktifkan paket user
        await this.repo.activatePackage(paymentLog.userId, paymentLog.packageId, endDate);
        console.log(`[MIDTRANS CALLBACK] User package activated for userId: ${paymentLog.userId}`);

        // Update paket di tabel company
        const [affectedRows] = await CompanyModel.update(
          { paketId: paymentLog.packageId },
          { where: { id: paymentLog.companyId } }
        );
        console.log(`[MIDTRANS CALLBACK] Company paketId updated. Affected rows: ${affectedRows}, companyId: ${paymentLog.companyId}, new paketId: ${paymentLog.packageId}`);

        if (affectedRows === 0) {
          console.error(`[MIDTRANS CALLBACK] WARNING: No company rows updated! companyId might be invalid: ${paymentLog.companyId}`);
        }
      } else {
        console.error(`[MIDTRANS CALLBACK] PaymentLog NOT FOUND for orderId: ${order_id}`);
      }
    }
  }

  // Manual verify payment status from Midtrans API
  async verifyPaymentManual(orderId: string) {
    console.log(`[MANUAL VERIFY] Starting verification for orderId: ${orderId}`);

    // Find payment log
    const paymentLog: any = await PaymentLogModel.findOne({
      where: { orderId },
    });

    if (!paymentLog) {
      throw new AppError("Payment log not found", 404);
    }

    console.log("[MANUAL VERIFY] PaymentLog found:", {
      id: paymentLog.id,
      userId: paymentLog.userId,
      companyId: paymentLog.companyId,
      packageId: paymentLog.packageId,
      currentStatus: paymentLog.transactionStatus,
    });

    // Check status from Midtrans API using Snap (same configuration as createTransaction)
    const snap = new midtransClient.Snap({
      isProduction: config.isProd,
      serverKey: config.MIDTRANS_SERVER_KEY,
      clientKey: config.MIDTRANS_CLIENT_KEY,
    });

    // Manually call Midtrans API to get transaction status
    const serverKey = config.MIDTRANS_SERVER_KEY;
    const auth = Buffer.from(`${serverKey}:`).toString("base64");
    const baseUrl = config.isProd
      ? "https://api.midtrans.com"
      : "https://api.sandbox.midtrans.com";

    const response = await fetch(`${baseUrl}/v2/${orderId}/status`, {
      method: "GET",
      headers: {
        "Accept": "application/json",
        "Authorization": `Basic ${auth}`,
      },
    });

    const midtransStatus: any = await response.json();
    console.log("[MANUAL VERIFY] Midtrans status response:", midtransStatus);

    let status = "PENDING";
    switch (midtransStatus.transaction_status) {
      case "settlement":
      case "capture":
        status = "SUCCESS";
        break;
      case "cancel":
      case "deny":
      case "expire":
        status = "FAILED";
        break;
    }

    // Update payment status
    await this.repo.updatePaymentStatus(orderId, status);
    console.log(`[MANUAL VERIFY] Payment status updated to ${status}`);

    if (status === "SUCCESS") {
      const endDate = new Date();
      endDate.setMonth(endDate.getMonth() + paymentLog.duration);

      // Activate package
      await this.repo.activatePackage(paymentLog.userId, paymentLog.packageId, endDate);
      console.log(`[MANUAL VERIFY] User package activated for userId: ${paymentLog.userId}`);

      // Update company paketId
      const [affectedRows] = await CompanyModel.update(
        { paketId: paymentLog.packageId },
        { where: { id: paymentLog.companyId } }
      );
      console.log(`[MANUAL VERIFY] Company paketId updated. Affected rows: ${affectedRows}`);
    }

    return {
      orderId,
      midtransStatus: midtransStatus.transaction_status,
      mappedStatus: status,
      paymentLogId: paymentLog.id,
      companyId: paymentLog.companyId,
      packageId: paymentLog.packageId,
    };
  }
}

