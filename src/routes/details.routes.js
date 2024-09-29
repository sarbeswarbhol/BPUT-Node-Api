import { Router } from 'express';
import {
    getDetails,
} from "../controllers/details.controller.js"

const router = Router();


router.route("/").get(getDetails)

export default router