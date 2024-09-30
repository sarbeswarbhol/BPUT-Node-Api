import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js"
import { asyncHandler } from "../utils/asyncHandler.js";
import { BPUT_URL, HEADERS } from "../constants.js";
import fetch from 'node-fetch';
import { VisitHistory } from "../models/vistHistory.model.js";
import { ApiRouteAccess } from "../models/routeHistory.model.js";


const getAllVisits = asyncHandler(async (req, res) => {
    try {
        const visits = await VisitHistory.find();
        res.status(200).json(visits);
    } catch (error) {
        res.status(500).json({ message: 'Server error while fetching visit history' });
    }
});

const getRouteAccessData = asyncHandler(async (req, res) => {
    try {
        const routeAccessData = await ApiRouteAccess.aggregate([
            {
                $group: {
                    _id: "$route",
                    uniqueUsers: { $addToSet: "$ip" },
                    accessCount: { $sum: 1 },
                },
            },
            {
                $project: {
                    route: "$_id",
                    uniqueUsersCount: { $size: "$uniqueUsers" },
                    accessCount: 1,
                    _id: 0,
                },
            },
        ]);
        res.status(200).json(routeAccessData);
    } catch (error) {
        res.status(500).json({ message: 'Server error while fetching API route access data' });
    }   
});


export {
    getAllVisits,
    getRouteAccessData

};
