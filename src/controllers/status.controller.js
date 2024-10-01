import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";


const getStatus = asyncHandler(async (_, res) => {
    const currentDateTime = new Date();
    const istTime = currentDateTime.toLocaleString('en-IN', {
        timeZone: 'Asia/Kolkata',
        hour12: true,
    });

    return res
    .status(200)
    .json(new ApiResponse(
        200,
        {timestamp: istTime},
        "API is running smoothly"
    ))

})



export { getStatus }; 