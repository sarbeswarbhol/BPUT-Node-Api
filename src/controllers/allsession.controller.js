import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { BPUT_URL, SHORT_CODE_SESSION } from "../constants.js";


async function handleAllSession() {
    const url = BPUT_URL;
    const response = await fetch(url);
    const html = await response.text();

    // Extract options using regex
    const regex = /<option[^>]*>([^<]*)<\/option>/g;
    let match;
    const sessions = [];
    while ((match = regex.exec(html)) !== null) {
        const sessionText = match[1].trim();
        if (sessionText !== 'Select Session') {
            sessions.push({ name: sessionText, shortCode: getShortCode(sessionText) });
        }
    }

    return sessions;
}

function getShortCode(sessionName) {
    const shortCodeMapping = SHORT_CODE_SESSION
    return shortCodeMapping[sessionName] || sessionName;
}


const getAllSession = asyncHandler(async (req, res) => {
    const sessions = await handleAllSession();  // Call the function to get session data
    if (!sessions || sessions.length === 0) {
    return res
    .status(404)
    .json(new ApiResponse(
        404,
        sessions,
        "No sessions found"
    ))
    }
    return res
    .status(200)
    .json(new ApiResponse(
        200,
        sessions,
        "Successfully fetched Sessions"
    ))
});

export {
    getAllSession,
};
