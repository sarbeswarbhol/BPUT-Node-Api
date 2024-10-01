import { ApiToken } from '../models/apitoken.model.js';
import jwt from 'jsonwebtoken';
import { ApiError } from '../utils/ApiError.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiResponse } from '../utils/ApiResponse.js';


export const verifyApiToken = asyncHandler(async (req, res, next) => {
    const token = req.query.token || req.header("Authorization")?.replace("Bearer", "").trim();

    if (!token) {
        return res.status(401).json(new ApiResponse(401, {}, "API token missing"));
    }

    const apiToken = await ApiToken.findOne({ token });


    if (!apiToken) {
        return res.status(401).json(new ApiResponse(401, {}, "Invalid API token"));
    }

    const now = new Date();
    if (apiToken.expirationDate < now) {
        return res.status(403).json(new ApiResponse(403, {}, "API token expired"));
    }


    const today = new Date().setUTCHours(0, 0, 0, 0);
    

    const lastUsedDate = apiToken.lastUsed ? new Date(apiToken.lastUsed).setUTCHours(0, 0, 0, 0) : null;

    if (lastUsedDate !== today) {
        apiToken.usageToday = 0; 
        apiToken.lastUsed = now; 
    } else {
        if (apiToken.usageToday >= apiToken.dailyLimit) {
            return res.status(401).json(new ApiResponse(401, {}, "API token daily limit reached"));
        }
    }

    apiToken.usageToday += 1;
    await apiToken.save(); 
    req.apiToken = apiToken;
    next();
});


// // Middleware to update the API token usage after successful requests
// export const updateApiTokenUsage = asyncHandler(async (req, res, next) => {
//     const apiToken = req.apiToken;
//     console.log("API Token before update:", apiToken);

//     // Only update usage if the response status is 200 (successful)
//     if (res.statusCode === 200) {
//         const responseData = res.locals.data; // Ensure this is set in your route handlers
//         console.log("Response Status:", res.statusCode);
//         console.log("Response Data:", responseData);

//         // Check if response data exists and has keys
//         if (responseData && Object.keys(responseData).length > 0) {
//             console.log("Incrementing usageToday. Current:", apiToken.usageToday);
//             apiToken.usageToday += 1; // Increment usage
//             apiToken.lastUsed = new Date(); // Update last used timestamp
//             await apiToken.save(); // Save changes to the database
//             console.log("New usageToday:", apiToken.usageToday);
//         } else {
//             console.log("No response data to increment usage");
//         }
//     } else {
//         console.log("Response was not successful. Status Code:", res.statusCode);
//     }
//     next();
// });
