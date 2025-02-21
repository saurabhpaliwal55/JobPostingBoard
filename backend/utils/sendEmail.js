import nodemailer from 'nodemailer';
import dotenv from "dotenv"
dotenv.config();


export const sendEmailOtp = async (email, otp) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Your OTP Code',
        text: `Your OTP code is: ${otp}`
    };

    await transporter.sendMail(mailOptions);
};

export const sendEmails = async (candidates,jobDescription)=>{
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });
    for(let candidateEmail of candidates){
        let mailOptions = {
            from: process.env.EMAIL_USER,
            to: candidateEmail,
            subject: 'InterView invitation',
            text: jobDescription,
        };
        try {
            await transporter.sendMail(mailOptions);
            console.log("mail sent to ",candidateEmail);
        } catch (error) {
            console.log(error);
        }
    }
}