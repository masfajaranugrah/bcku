"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendVerificationEmail = sendVerificationEmail;
const nodemailer_1 = __importDefault(require("nodemailer"));
const env_1 = require("@config/env");
const transporter = nodemailer_1.default.createTransport({
    host: env_1.config.EMAIL_HOST,
    port: env_1.config.EMAIL_PORT,
    secure: false,
    auth: {
        user: env_1.config.EMAIL_USER,
        pass: env_1.config.EMAIL_PASS,
    },
});
async function sendVerificationEmail(email, token, tokenExpiresAt, verificationEmailToken, verificationEmailTokenExpires) {
    const verificationUrl = `http://localhost:3000/authentication/verification/?token=${verificationEmailToken}`;
    const mailOptions = {
        from: `"Nexola" <${env_1.config.EMAIL_USER}>`,
        to: email,
        subject: 'Verifikasi Email Anda',
        html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2>Verifikasi Email Anda</h2>
        <p>Terima kasih telah mendaftar. Anda bisa memverifikasi email dengan dua cara:</p>
        
        <h3>Gunakan Kode OTP</h3>
        <p>Masukkan kode berikut di halaman verifikasi:</p>
        <div style="font-size: 22px; font-weight: bold; background: #f3f3f3; padding: 10px; display: inline-block; border-radius: 6px;">
          ${token}
        </div>

        <h3 style="margin-top: 20px;">Klik Tombol Verifikasi</h3>
        <p>Atau Anda bisa langsung memverifikasi email dengan klik tombol di bawah ini:</p>
        <a href="${verificationUrl}" 
          style="display:inline-block; background:#007bff; color:#fff; padding:12px 24px; border-radius:6px; text-decoration:none; font-weight:bold;">
          Verifikasi Email
        </a>
        
        <p style="margin-top: 20px;">⚠️ Kode OTP dan link verifikasi ini akan kadaluarsa pada: <b>${tokenExpiresAt.toLocaleString('id-ID')}</b></p>
 <p>⚠️ Kode OTP dan link verifikasi ini akan kadaluarsa pada: <b>${verificationEmailTokenExpires.toLocaleString("id-ID")}</b></p>
        <p>Jika Anda tidak merasa mendaftar di aplikasi kami, abaikan email ini.</p>

        <hr style="border:none; border-top:1px solid #ddd; margin: 20px 0;" />

        <!-- Footer -->
        <div style="font-size: 12px; color: #666; text-align: center;">
          <p>&copy; ${new Date().getFullYear()} Nexola. All rights reserved.</p>
          <p>Hubungi kami: <a href="mailto:support@nexola.com" style="color: #007bff; text-decoration: none;">support@nexola.com</a></p>
          <p>Ini adalah email otomatis, mohon tidak membalas langsung ke email ini.</p>
        </div>
      </div>
    `,
    };
    try {
        await transporter.sendMail(mailOptions);
        console.log(`✅ Verification email sent to ${email}`);
    }
    catch (error) {
        console.error('❌ Error sending verification email:', error);
        throw new Error('Failed to send verification email');
    }
}
//# sourceMappingURL=sendVerificationEmail.js.map