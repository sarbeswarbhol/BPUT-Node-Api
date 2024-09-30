import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js"
import { asyncHandler } from "../utils/asyncHandler.js";
import { VisitHistory } from "../models/vistHistory.model.js";
import { ApiRouteAccess } from "../models/routeHistory.model.js";


const getAllVisits = asyncHandler(async (req, res) => {
    try {
        const visits = await VisitHistory.aggregate([
            {
                $project: {
                    _id: 0, 
                    ip: 1,
                    count: 1, 
                    firstVisit: "$firsttimestamp", 
                    lastVisit: "$lasttimestamp",   
                }
            },
            {
                $sort: { lastVisit: -1 } 
            }
        ]);
        const wholeview = await VisitHistory.aggregate([
            {
                $group: {
                    _id: null,
                    totalViews: { $sum: "$count" }
                }
            }
        ]);
        const totalViews = wholeview.length > 0 ? wholeview[0].totalViews : 0;

        return res
        .status(200)
        .json(new ApiResponse(
        200,
        { 
            wholeview: totalViews,
            visits
        },
        "Successfully Fetched"))

    } catch (error) {
        return res
        .status(500)
        .json(new ApiResponse(
        500,
        {},
        "Server error while fetching visit history"))
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
        return res
        .status(200)
        .json(new ApiResponse(
        200,
        { routeAccessData },
        "Successfully Fetched"))
    } catch (error) {
        return res
        .status(500)
        .json(new ApiResponse(
        500,
        {},
        "Server error while fetching API route access data"))
    }   
});


export {
    getAllVisits,
    getRouteAccessData

};
