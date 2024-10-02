import { Router } from 'express';
import {
    sendOTPVerification,
    newVerifyOTP
} from "../controllers/otpVerification.controller.js"

const router = Router();


router.route("/").post(sendOTPVerification)
router.route("/verify").post(newVerifyOTP)

export default router