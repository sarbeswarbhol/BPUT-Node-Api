import nodemailer from 'nodemailer';

let transporter =  nodemailer.createTransport({
    service: "gmail",
    secure: true,
    port: 465,
    auth: {
        user: 'arctixbotboy12@gmail.com',
        pass: 'orhh jlag fkdv ivce'
    }
});

// Verify the transporter
transporter.verify((error, success) => {
    if (error) {
        console.log('Error in SMTP configuration:', error);
    } else {
        console.log("SMTP server is ready to send messages");
    }
});

// Function to send email
const sendEmail = async (mailOptions) => {
    try {
        await transporter.sendMail(mailOptions);  // Correct method is sendMail
        console.log('Email sent successfully');
    } catch (error) {
        console.error('Error sending email:', error);
        throw error;
    }
};

const generateOTP = async () => {
    try {
        const otp = `${Math.floor(1000 + Math.random() * 9000)}`;
        return otp;
    } catch (error) {
        throw error
    }

}

export { generateOTP, sendEmail }