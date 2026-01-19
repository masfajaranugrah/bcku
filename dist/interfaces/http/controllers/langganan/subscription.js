"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubscriptionController = void 0;
const subscription_1 = require("@infrastructure/repositories/langganan/subscription");
const PackageRepository_1 = require("@infrastructure/repositories/paket/PackageRepository");
const CreateSubscriptionUseCase_1 = require("@application/usecase/langganan/CreateSubscriptionUseCase");
class SubscriptionController {
    constructor() {
        this.subscriptionRepo = new subscription_1.SubscriptionRepository();
        this.packageRepo = new PackageRepository_1.PackageRepository();
        this.createSubscriptionUseCase = new CreateSubscriptionUseCase_1.CreateSubscriptionUseCase(this.subscriptionRepo, this.packageRepo);
    }
    async createOrder(req, res) {
        const { companyId, userId } = req.params;
        const { packageId, duration } = req.body;
        if (!userId || !companyId) {
            return res.status(400).json({ error: "userId and companyId are required" });
        }
        try {
            const result = await this.createSubscriptionUseCase.execute({
                userId,
                companyId,
                packageId,
                duration,
            });
            res.json(result);
        }
        catch (err) {
            res.status(err.statusCode || 500).json({ error: err.message });
        }
    }
    async callback(req, res) {
        try {
            await this.createSubscriptionUseCase.handleCallback(req.body);
            res.json({ status: "success" });
        }
        catch (err) {
            res.status(err.statusCode || 500).json({ error: err.message });
        }
    }
}
exports.SubscriptionController = SubscriptionController;
//# sourceMappingURL=subscription.js.map