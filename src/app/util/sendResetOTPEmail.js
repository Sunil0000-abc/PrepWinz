import nodemailer from "nodemailer"

export const sendResetOTPEmail = async (email,otp) =>{
    const transporter = nodemailer.createTransport({
        service:"gmail",
        auth:{
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });

    const mailOptions = {
    from: `"PrepWinz Support" <${process.env.EMAIL_USER}>`,
    to:email,
    subject: "Reset Your Password - OTP Inside",
    text: `Hello,

We received a request to reset your password.

🔐 Your OTP is: ${otp}

Please use this OTP within 10 minutes.

If you didn’t request this, please ignore this email.

- PrepWinz Team`,
  };

  await transporter.sendMail(mailOptions);
}