import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js"
import { asyncHandler } from "../utils/asyncHandler.js";
import { sendOTP, verifyOTP } from "./sendOTP.controller.js";


const sendOTPVerification = asyncHandler(async (req, res) => {
    try {
        const { email, subject, message, duration } = req.body
        const createdOTP = await sendOTP({
            email,
            subject,
            message,
            duration
        })
        res.status(200).json(createdOTP)
    } catch (error) {
        res.status(400).json(error.message)
    }
});


const newVerifyOTP = asyncHandler(async (req, res) => {
    try {
        const { email, otp  } = req.body
    
        const validOTP = await verifyOTP({ email, otp })
        res.status(200).json({valid: validOTP})
    } catch (error) {
        res.status(400).send(error.message)
    }
})

export {
    sendOTPVerification,
    newVerifyOTP
};
