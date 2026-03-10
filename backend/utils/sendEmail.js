import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const sendOtpEmail = async (to, otp) => {
  try {
    await transporter.sendMail({
      from: `"Glaucoma AI" <${process.env.EMAIL_USER}>`,
      to,
      subject: "Your OTP Verification Code",
      html: `
        <div style="font-family: Arial; padding:20px">
          <h2>Email Verification</h2>
          <p>Your OTP code is:</p>
          <h1 style="letter-spacing:4px">${otp}</h1>
          <p>This OTP will expire in 5 minutes.</p>
        </div>
      `,
    });

    console.log("OTP email sent");
  } catch (error) {
    console.error("OTP email failed:", error);
  }
};

export const sendGlaucomaAlert = async (to) => {
  try {
    await transporter.sendMail({
      from: `"Glaucoma AI" <${process.env.EMAIL_USER}>`,
      to,
      subject: "⚠ Glaucoma Risk Detected",
      html: `
        <div style="font-family: Arial; padding:20px">
          <h2>Glaucoma Detection Alert</h2>
          <p>Your retinal scan shows signs of <b>possible glaucoma</b>.</p>
          <p>Please consult an ophthalmologist for further evaluation.</p>
        </div>
      `,
    });

    console.log("Glaucoma alert email sent");
  } catch (error) {
    console.error("Alert email failed:", error);
  }
};
