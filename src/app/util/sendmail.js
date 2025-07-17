import nodemailer from "nodemailer";

export const sendOTPEmail = async(email,otp) =>{
    const transporter = nodemailer.createTransport({
        service:"gmail",
        auth:{
            user:process.env.EMAIL_USER,
            pass:process.env.EMAIL_PASS,
        }
    })

    const mailOption = {
        from : `PrepWinz <${process.env.EMAIL_USER}>`,
        to:email,
        subject:"Otp for verification",
        text:`Your otp is : ${otp}`
    }

    await transporter.sendMail(mailOption);
}