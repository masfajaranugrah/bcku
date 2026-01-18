import crypto from "crypto";

export function generateVerificationToken(): { token: string; tokenExpiresAt: Date } {
  const buffer = crypto.randomBytes(3);
  const token = (parseInt(buffer.toString("hex"), 16) % 1000000)
    .toString()
    .padStart(6, "0");

  const tokenExpiresAt = new Date(Date.now() + 5 * 60 * 1000);  

  return { token, tokenExpiresAt };
}
