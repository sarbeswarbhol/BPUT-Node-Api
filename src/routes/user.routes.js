import { Router } from 'express';
import {
    userSignIn,
    userSignUp
} from "../controllers/user.controller.js"


const router = Router();


router.route("/login").post(userSignIn)
router.route("/signup").post(userSignUp)

export default router
