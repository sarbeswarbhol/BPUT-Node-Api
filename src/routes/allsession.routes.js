import { Router } from 'express';
import {
    getAllSession,
} from "../controllers/allsession.controller.js"

const router = Router();


router.route("/").get(getAllSession)

export default router