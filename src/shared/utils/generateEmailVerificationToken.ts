import crypto from 'crypto';

export default function generateEmailVerificationToken(): {tokenVerification: string; tokenVerificationExpiresAt: Date}{
    const tokenVerification = crypto.randomBytes(32).toString("hex");
    const tokenVerificationExpiresAt = new Date(Date.now() + 60 * 60 * 1000);
    return  {tokenVerification, tokenVerificationExpiresAt}
}