import { Router } from 'express';
import {
    getAllVisits,
    getRouteAccessData
} from "../controllers/stats.controller.js"

import { getAllVisitsDateWise } from '../controllers/statsDateWise.controller.js';

const router = Router();


router.route("/visits").get(getAllVisits)
router.route("/routes").get(getRouteAccessData)
router.route("/datewise").get(getAllVisitsDateWise)

export default router