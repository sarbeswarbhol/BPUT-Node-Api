import { ApiError } from "../utils/ApiError.js"
import { OTP } from "../models/otp.model.js"
import { generateOTP, sendEmail } from "../utils/generateOTP.js"

const verifyOTP = async ({ email, otp }) => {
    try {
        if (!(email && otp)) {
            throw Error("provide email and otp")
        }

        const matchOTPRecord = await OTP.findOne({ email })
        if (!matchOTPRecord) {
            throw Error("No  otp records found")
        }
        const { expiredAt } = matchOTPRecord
        if (expiredAt < Date.now()) {
            await OTP.deleteOne({ email })
            throw Error("Code was expired , request new code")
        }

        const validOTP = matchOTPRecord.otp
        if (otp === matchOTPRecord?.otp) {
            return true;
        } else {
            return false;
        }
    } catch (error) {
        throw error
    }
}


const sendOTP = async ({ email, subject, message, duration = 1 }) => {
    try {
        if (!(email && subject && message)) {
            throw new ApiError(401, "Provide all values")
        }
        // clear old record
        await OTP.deleteOne({ email })
        // generateotp
        const generatedOTP = await generateOTP();

        const mailOptions = {
            from: process.env.AUTH_EMAIL,
            to: email,
            subject,
            html: `
            <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; color: #2c3e50; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9; border: 1px solid #eaeaea; border-radius: 8px;">
                <div style="text-align: center; padding: 20px 0; background-color: #3498db; color: white; border-radius: 8px 8px 0 0;">
                    <h1 style="font-size: 26px; margin: 0;">OTP Verification</h1>
                </div>
                <div style="padding: 20px; background-color: white;">
                    <p style="font-size: 16px; line-height: 1.8; color: #34495e;">Hello,</p>
                    <p style="font-size: 16px; line-height: 1.8; color: #34495e;">${message}</p>
                    <div style="margin: 30px 0; text-align: center;">
                        <p style="font-size: 18px; margin-bottom: 5px; color: #2c3e50;">Your OTP Code:</p>
                        <p style="font-size: 34px; font-weight: bold; color: #e74c3c; letter-spacing: 4px;">${generatedOTP}</p>
                    </div>
                    <p style="font-size: 16px; text-align: center; color: #34495e;">The code <strong>expires in ${duration} hour(s)</strong>.</p>
                </div>
                <div style="padding: 20px; background-color: #ecf0f1; text-align: center; border-radius: 0 0 8px 8px;">
                    <p style="font-size: 14px; color: #95a5a6;">If you did not request this OTP, please ignored this email.</p>
                </div>
            </div>
            `
        };
        
        await sendEmail(mailOptions)
        // savw otp record
        const newOTP = await new OTP({
            email,
            otp: generatedOTP,
            createdAt: Date.now(),
            expiredAt: Date.now() + 3600000 * +duration
        })
        const createdOTPRecord = await newOTP.save()
        return createdOTPRecord

    } catch (error) {
        throw error
    }
}

const deleteOTP = async (email) => {
    try {
        await OTP.deleteOne({ email })
    } catch (error) {
        throw error
    }
}

export { sendOTP, verifyOTP, deleteOTP }