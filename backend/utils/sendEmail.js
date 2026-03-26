import { Resend } from "resend";
import dotenv from "dotenv";

dotenv.config();

const resend = new Resend(process.env.RESEND_API_KEY);

const FROM_EMAIL = "onboarding@resend.dev";

export const sendOtpEmail = async (to, otp) => {
  try {
    await resend.emails.send({
      from: `Glaucoma AI <${FROM_EMAIL}>`,
      to: [to],
      subject: "Your OTP Verification Code",
      html: `
        <div style="font-family: Arial; padding:20px">
          <h2>Email Verification</h2>
          <p>Your OTP code is:</p>
          <h1>${otp}</h1>
        </div>
      `,
    });
    console.log("Sending OTP to:", to);
    console.log("✅ OTP sent via Resend");
  } catch (error) {
    console.error("❌ Resend error:", error);
  }
};

export const sendGlaucomaAlert = async (to) => {
  try {
    await resend.emails.send({
      from: `Glaucoma AI <${FROM_EMAIL}>`,
      to: to,
      subject: "⚠ Glaucoma Risk Detected",
      html: `<h2>Glaucoma Alert</h2>`,
    });

    console.log("✅ Alert sent via Resend");
  } catch (error) {
    console.error("❌ Resend error:", error);
  }
};
