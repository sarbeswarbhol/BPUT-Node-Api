import mongoose from 'mongoose';
import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { VisitHistory, VisitCount } from "../models/vistHistory.model.js";
import { startOfDay, endOfDay, parseISO, formatISO, subDays } from 'date-fns';

const getAllVisitsDateWise = asyncHandler(async (req, res) => {
    try {
        const { date } = req.query;
        let targetDate;

        if (date === "yesterday") {
            targetDate = subDays(new Date(), 1);
        } else {
            targetDate = date ? parseISO(date) : new Date();
        }


        const targetDateIST = new Date(targetDate.getTime() + 5.5 * 60 * 60 * 1000);
        const searchDate = formatISO(startOfDay(targetDateIST), { representation: 'date' });

    
        const visitCount = await VisitCount.findOne({ date: searchDate });

        const totalViews = visitCount ? visitCount.count : 0;

        return res.status(200).json(new ApiResponse(
            200,
            { wholeview: totalViews },
            "Successfully fetched total views"
        ));
    } catch (error) {
        console.error("Error fetching total views:", error);
        return res.status(500).json(new ApiResponse(
            500,
            {},
            "Server error while fetching total views"
        ));
    }
});

export {
    getAllVisitsDateWise
};
