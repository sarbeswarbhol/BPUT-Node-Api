import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js"
import { asyncHandler } from "../utils/asyncHandler.js";
import { BPUT_URL, HEADERS } from "../constants.js";
import fetch from 'node-fetch'; 


const getDetails = asyncHandler(async (req, res) => {
    const rollNo = req.query.rollno || req.query.rollNo;
    if (!rollNo) {
        return res
        .status(404)
        .json(new ApiResponse(
        404,
        {},
        "Pass The roll No"
    ))
    //     throw new ApiError(404, "Please Provide Roll No")
    }
    const url = `${BPUT_URL}/student-detsils-results?rollNo=${rollNo}`;

    const responseData = await fetch(url, {
        method: "POST",
        headers: HEADERS,
    })
    const detailsData = await responseData.json()
    return res
    .status(200)
    .json(new ApiResponse(
        200,
        {detailsData},
        "Successfully fetch Data"
    ))
    
});


export {
    getDetails,
};
