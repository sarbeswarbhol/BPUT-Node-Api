import { Router } from 'express';
import {
    getResults,
    getCompleteResults,
    getResultsWithDetails,
    getResultsWithDetailsAndHtml
} from "../controllers/result.controller.js"

const router = Router();


router.route("/").get(getResults)
router.route("/c/").get(getCompleteResults)
router.route("/a/").get(getResultsWithDetails)
router.route("/html/").get(getResultsWithDetailsAndHtml)


export default router