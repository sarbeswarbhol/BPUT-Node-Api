import { Router } from 'express';
import {
    getAllVisits,
    getRouteAccessData
} from "../controllers/stats.controller.js"

const router = Router();


router.route("/visits").get(getAllVisits)
router.route("/routes").get(getRouteAccessData)

export default router