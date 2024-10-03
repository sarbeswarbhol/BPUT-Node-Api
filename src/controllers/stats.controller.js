import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js"
import { asyncHandler } from "../utils/asyncHandler.js";
import { VisitHistory } from "../models/vistHistory.model.js";
import { ApiRouteAccess } from "../models/routeHistory.model.js";

const formatDateToIST = (date) => {
    const options = { 
        year: 'numeric', 
        month: '2-digit', 
        day: '2-digit', 
        hour: 'numeric', 
        minute: 'numeric', 
        second: 'numeric', 
        hour12: true,
        timeZone: 'Asia/Kolkata' // IST time zone
    };
    return new Intl.DateTimeFormat('en-US', options).format(date);
};

const getAllVisits = asyncHandler(async (req, res) => {
    try {
        const totalViewsResult = await VisitHistory.aggregate([
            {
                $group: {
                    _id: null, // Grouping by null to get a single result
                    totalViews: { $sum: "$count" } // Sum the counts
                }
            }
        ]);

        const totalViews = totalViewsResult.length > 0 ? totalViewsResult[0].totalViews : 0;

        // Get visits by IP with additional details, sorted by most recent activity
        const visitsByIP = await VisitHistory.aggregate([
            {
                $group: {
                    _id: "$ip", // Group by the IP address
                    totalCount: { $sum: "$count" }, // Sum the visit counts for each IP
                    firstTimestamp: { $min: "$firsttimestamp" }, // Earliest visit
                    lastTimestamp: { $max: "$lasttimestamp" } // Latest visit
                }
            },
            {
                $sort: { lastTimestamp: -1 } // Sort by lastTimestamp in descending order
            }
        ]);

        // Format the dates after fetching the data
        const formattedVisits = visitsByIP.map(visit => ({
            ip: visit._id,
            totalCount: visit.totalCount,
            firstVisit: formatDateToIST(visit.firstTimestamp), // Format first visit date
            lastVisit: formatDateToIST(visit.lastTimestamp) // Format last visit date
        }));

        // Create the response object
        const response = {
            wholeView: totalViews,
            visits: formattedVisits
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
        {error},
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
