import { Router } from 'express';
import {
    getExamInfo,
} from "../controllers/examinfo.controller.js"

const router = Router();


router.route("/").get(getExamInfo)

export default router