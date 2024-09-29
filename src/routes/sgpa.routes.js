import { Router } from 'express';
import {
    getSgpa
} from "../controllers/sgpa.controller.js"

const router = Router();


router.route("/").get(getSgpa)



export default router