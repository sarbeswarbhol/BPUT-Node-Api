import { Router } from 'express';
import {
    getAllVisits,
    getRouteAccessData
} from "../controllers/stats.controller.js"

import { getAllVisitsDateWise } from '../controllers/statsDateWise.controller.js';
import { generateApiToken } from '../controllers/apiToken.controller.js';

const router = Router();


router.route("/visits").get(getAllVisits)
router.route("/routes").get(getRouteAccessData)
router.route("/datewise").get(getAllVisitsDateWise)
router.route("/createtoken").post(generateApiToken).get(generateApiToken)

export default router