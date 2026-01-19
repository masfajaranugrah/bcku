"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateSubscriptionUseCase = void 0;
const midtrans_client_1 = __importDefault(require("midtrans-client"));
const crypto_1 = __importDefault(require("crypto"));
const AppError_1 = require("@shared/errors/AppError");
const env_1 = require("@config/env");
const PaymentLogModel_1 = __importDefault(require("@infrastructure/database/models/langganan/PaymentLogModel"));
const models_1 = require("@infrastructure/database/models");
class CreateSubscriptionUseCase {
    constructor(repo, packageRepo) {
        this.repo = repo;
        this.packageRepo = packageRepo;
    }
    async execute(dto) {
        const { userId, companyId, packageId, duration } = dto;
        // Ambil data paket
        const selectedPackage = await this.packageRepo.findById(packageId);
        if (!selectedPackage)
            throw new AppError_1.AppError("Package not found", 404);
        // Ambil data user & company
        const user = await models_1.UserModel.findByPk(userId);
        if (!user)
            throw new AppError_1.AppError("User not found", 404);
        const company = await models_1.CompanyModel.findByPk(companyId);
        if (!company)
            throw new AppError_1.AppError("Company not found", 404);
        const grossAmount = selectedPackage.price * duration;
        // Generate orderId unik
        const shortCompany = companyId.slice(0, 8);
        const shortUser = userId.slice(0, 8);
        const timestamp = Date.now();
        const orderId = `ORDER-${shortCompany}-${shortUser}-${timestamp}`;
        // Buat transaksi Midtrans
        const snap = new midtrans_client_1.default.Snap({
            isProduction: env_1.config.isProd,
            serverKey: env_1.config.MIDTRANS_SERVER_KEY,
            clientKey: env_1.config.MIDTRANS_CLIENT_KEY,
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
    verifySignature(payload) {
        const { order_id, status_code, gross_amount, signature_key } = payload;
        if (!order_id || !status_code || !gross_amount || !signature_key) {
            return false;
        }
        const serverKey = env_1.config.MIDTRANS_SERVER_KEY;
        const signatureString = `${order_id}${status_code}${gross_amount}${serverKey}`;
        const expectedSignature = crypto_1.default
            .createHash("sha512")
            .update(signatureString)
            .digest("hex");
        return signature_key === expectedSignature;
    }
    // Handle callback Midtrans
    async handleCallback(payload) {
        // Verify signature to prevent spoofing
        if (!this.verifySignature(payload)) {
            throw new AppError_1.AppError("Invalid signature", 403);
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
            const paymentLog = await PaymentLogModel_1.default.findOne({
                where: { orderId: order_id },
            });
            if (paymentLog) {
                const endDate = new Date();
                endDate.setMonth(endDate.getMonth() + 1); // contoh durasi 1 bulan
                // Aktifkan paket user
                await this.repo.activatePackage(paymentLog.userId, paymentLog.packageId, endDate);
                // Update paket di tabel company
                await models_1.CompanyModel.update({ paketId: paymentLog.packageId }, { where: { id: paymentLog.companyId } });
            }
        }
    }
}
exports.CreateSubscriptionUseCase = CreateSubscriptionUseCase;
//# sourceMappingURL=CreateSubscriptionUseCase.js.map