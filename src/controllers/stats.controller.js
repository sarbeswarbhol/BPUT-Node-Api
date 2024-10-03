import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js"
import { asyncHandler } from "../utils/asyncHandler.js";
import { VisitHistory } from "../models/vistHistory.model.js";
import { ApiRouteAccess } from "../models/routeHistory.model.js";

const getAllVisits = asyncHandler(async (req, res) => {
    try {
        const totalViewsResult = await VisitHistory.aggregate([
            {
                $group: {
                    _id: null,
                    totalViews: { $sum: "$count" }
                }
            }
        ]);

        const totalViews = totalViewsResult.length > 0 ? totalViewsResult[0].totalViews : 0;


        const visitsByIP = await VisitHistory.aggregate([
            {
                $group: {
                    _id: "$ip",
                    totalCount: { $sum: "$count" },
                    firstTimestamp: { $min: "$firsttimestamp" },
                    lastTimestamp: { $max: "$lasttimestamp" } 
                }
            },
            {
                $project: {
                    _id: 0, 
                    ip: "$_id",
                    totalCount: 1, 
                    firstTimestamp: {
                        $dateToString: {
                            format: "%Y-%m-%dT%H:%M:%S.%LZ", // Specify the format you want
                            date: {
                                $add: ["$firstTimestamp", 19800000] // Add 5 hours 30 minutes in milliseconds
                            }
                        }
                    },
                    lastTimestamp: {
                        $dateToString: {
                            format: "%Y-%m-%dT%H:%M:%S.%LZ", // Specify the format you want
                            date: {
                                $add: ["$lastTimestamp", 19800000] // Add 5 hours 30 minutes in milliseconds
                            }
                        }
                    }
                }
            },
            {
                $sort: { lastTimestamp: -1 } // Sort by lastTimestamp in descending order
            }
        ]);

        // Create the response object
        const response = {
            wholeView: totalViews,
            visits: visitsByIP
        };

        return res
        .status(200)
        .json(new ApiResponse(
         200,
         {response},
         "Successfully fetched total views and visits by IP"));
    } catch (error) {
        return res
        .status(500)
        .json(new ApiResponse(
        500,
        {},
        "Server error while fetching visit history"))
    }
});


const getTotalViewsAndVisits = asyncHandler(async (req, res) => {
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
