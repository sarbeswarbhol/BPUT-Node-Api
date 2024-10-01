import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { BPUT_URL, HEADERS, SHORT_CODE_SESSION } from "../constants.js";
import mapSessionCode from "./sessionmapping.controller.js"
import fetch from 'node-fetch';
 


const getSgpa = asyncHandler(async (req, res) => {
    // https://results.bput.ac.in/student-results-sgpa?rollNo=2201367065&semid=4&session=Even-(2023-24)
    // http://localhost:3000/api/v1/result?semid=4&rollNo=2201364067&session=Even-(2023-24)

    const { rollno, semid, session } = req.query
    // console.log("rollno:- ", rollno)
    // console.log("semid:- ", semid)
    // console.log("session:- ", session)
    if (!(rollno && semid && session)) {
        return res
            .status(404)
            .json(new ApiResponse(
                404,
                {},
                "Please provide rollNo, semid, and session."
            ))
    }
    const isShortCode = session.length === 3 && /^[A-Z]\d+$/.test(session);
    const fullSessionName = isShortCode ? mapSessionCode(session) : session;

    if (!Object.keys(SHORT_CODE_SESSION).includes(fullSessionName)) {
        return res
            .status(400)
            .json(new ApiResponse(
                400,
                {SHORT_CODE_SESSION},
                "Invalid session code or session not recognized. Use Short Code"
            ));
    }

    const url = `${BPUT_URL}/student-results-sgpa?rollNo=${rollno}&semid=${semid}&session=${fullSessionName}`;

    try {
        const responseData = await fetch(url, {
            method: "POST",
            headers: HEADERS,
        })
        if (!responseData.ok) {
            return res
                .status(response.status)
                .json(new ApiResponse(
                    response.status,
                    {},
                    `Error fetching data: ${response.statusText}`
                ));
        }
        const detailsData = await responseData.json();

        if (!detailsData || Object.keys(detailsData).length === 0) {
            return res
                .status(404)
                .json(new ApiResponse(
                    404,
                    {},
                    "No data found."
                ));
        }

        return res
            .status(200)
            .json(new ApiResponse(
                200,
                { detailsData },
                "Successfully fetch Data"
            ))


    } catch (error) {
        return res
            .status(500)
            .json(new ApiResponse(
                500,
                {},
                `Error fetching data: ${error.message}`
            ));
    }


});



export {
    getSgpa,
};
