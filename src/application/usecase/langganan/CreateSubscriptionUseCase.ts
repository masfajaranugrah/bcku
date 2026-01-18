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
    // Verify signature to prevent spoofing
    if (!this.verifySignature(payload)) {
      throw new AppError("Invalid signature", 403);
    }

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

    // Update status pembayaran di database
    await this.repo.updatePaymentStatus(order_id, status);

    if (status === "SUCCESS") {
      const paymentLog: any = await PaymentLogModel.findOne({
        where: { orderId: order_id },
      });

      if (paymentLog) {
        const endDate = new Date();
        endDate.setMonth(endDate.getMonth() + 1); // contoh durasi 1 bulan

        // Aktifkan paket user
        await this.repo.activatePackage(paymentLog.userId, paymentLog.packageId, endDate);

        // Update paket di tabel company
        await CompanyModel.update(
          { paketId: paymentLog.packageId },
          { where: { id: paymentLog.companyId } }
        );
      }
    }
  }
}

