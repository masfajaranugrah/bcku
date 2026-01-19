"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendResetPasswordEmail = sendResetPasswordEmail;
const nodemailer_1 = __importDefault(require("nodemailer"));
const env_1 = require("@config/env");
const transporter = nodemailer_1.default.createTransport({
    host: env_1.config.EMAIL_HOST,
    port: env_1.config.EMAIL_PORT,
    secure: false, // true jika pakai port 465
    auth: {
        user: env_1.config.EMAIL_USER,
        pass: env_1.config.EMAIL_PASS,
    },
});
/**
 * Kirim email reset password ke user
 * @param email Email penerima
 * @param token Token reset password
 * @param tokenExpiresAt Waktu kadaluarsa token
 */
async function sendResetPasswordEmail(email, token, tokenExpiresAt) {
    const resetLink = `http://localhost:3000/authentication/reset-password/?token=${token}`;
    const mailOptions = {
        from: `"Nexola" <${env_1.config.EMAIL_USER}>`,
        to: email,
        subject: 'Reset Password Anda',
        html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2>Reset Password Anda</h2>
        <p>Kami menerima permintaan reset password untuk akun Anda.</p>
        
        <p>Klik tombol di bawah ini untuk membuat password baru:</p>
        <a href="${resetLink}" style="
          display:inline-block;
          padding:10px 20px;
          background:#1976d2;
          color:#fff;
          text-decoration:none;
          border-radius:6px;
        ">Reset Password</a>

        <p>⚠️ Link ini akan kadaluarsa pada: <b>${tokenExpiresAt.toLocaleString('id-ID')}</b></p>
        <p>Jika Anda tidak meminta reset password, abaikan email ini.</p>
      </div>
    `,
    };
    try {
        await transporter.sendMail(mailOptions);
        console.log(`✅ Reset password email sent to ${email}`);
    }
    catch (error) {
        console.error('❌ Error sending reset password email:', error);
        throw new Error('Failed to send reset password email');
    }
}
//# sourceMappingURL=sendResetPasswordEmail.js.map