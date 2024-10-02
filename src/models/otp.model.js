import mongoose, {Schema} from "mongoose";

const otpSchema = new mongoose.Schema({
    email: String,
    otp: String,
    createdAt: Date,
    expiredAt: Date,
})

const OTP = mongoose.model('OTP', otpSchema)

export { OTP }