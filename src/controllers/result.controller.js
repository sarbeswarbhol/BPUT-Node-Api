import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js"
import { asyncHandler } from "../utils/asyncHandler.js";
import { BPUT_URL, HEADERS, SHORT_CODE_SESSION } from "../constants.js";
import mapSessionCode from "./sessionmapping.controller.js"
import fetch from 'node-fetch';


const getResults = asyncHandler(async (req, res) => {
    // https://results.bput.ac.in/student-results-subjects-list?semid=4&rollNo=2201364067&session=Even-(2023-24)
    // http://localhost:3000/api/v1/result?semid=4&rollNo=2201364067&session=Even-(2023-24)

    const { rollno, semid, session } = req.query
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
                { SHORT_CODE_SESSION },
                "Invalid session code or session not recognized. Use Short Code"
            ));
    }

    const url = `${BPUT_URL}/student-results-subjects-list?semid=${semid}&rollNo=${rollno}&session=${fullSessionName}`;
    console.log(url);

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


const getCompleteResults = asyncHandler(async (req, res) => {

    // https://results.bput.ac.in/student-results-sgpa?rollNo=2201367065&semid=4&session=Even-(2023-24)


    const { rollno, semid, session } = req.query
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
                { SHORT_CODE_SESSION },
                "Invalid session code or session not recognized."
            ));
    }

    const resultUrl = `${BPUT_URL}/student-results-subjects-list?semid=${semid}&rollNo=${rollno}&session=${fullSessionName}`;
    const sgpaUrl = `${BPUT_URL}/student-results-sgpa?rollNo=${rollno}&semid=${semid}&session=${fullSessionName}`;

    try {

        const [resultResponseData, sgpaReposeData] = await Promise.all([
            fetch(resultUrl, { method: "POST", headers: HEADERS }),
            fetch(sgpaUrl, { method: "POST", headers: HEADERS })
        ]);

        if (!resultResponseData.ok || !sgpaReposeData.ok) {
            return res
                .status(resultResponseData.status || sgpaReposeData.status)
                .json(new ApiResponse(
                    resultResponseData.status || sgpaReposeData.status,
                    {},
                    `Error fetching data: ${resultResponseData.statusText || sgpaReposeData.statusText}`
                ));
        }


        const [resltDetailsData, sgpaDetailsData] = await Promise.all([
            resultResponseData.json(),
            sgpaReposeData.json()
        ]);

        if (!resltDetailsData || Object.keys(resltDetailsData).length === 0) {
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
                { resltDetailsData, sgpaDetailsData },
                "Successfully fetched data"
            ));

    } catch (error) {
        return res
            .status(500)
            .json(new ApiResponse(
                500,
                {},
                `Error fetching data: ${error.message}`
            ));
    }


})


const getResultsWithDetails = asyncHandler(async (req, res) => {
    const { rollno, semid, session } = req.query
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
                { SHORT_CODE_SESSION },
                "Invalid session code or session not recognized."
            ));
    }


    const resultUrl = `${BPUT_URL}/student-results-subjects-list?semid=${semid}&rollNo=${rollno}&session=${fullSessionName}`;
    const sgpaUrl = `${BPUT_URL}/student-results-sgpa?rollNo=${rollno}&semid=${semid}&session=${fullSessionName}`;
    const detailsUrl = `${BPUT_URL}/student-detsils-results?rollNo=${rollno}`;

    try {
        const [resultResponseData, sgpaReposeData, detailsRresponseData] = await Promise.all([
            fetch(resultUrl, { method: "POST", headers: HEADERS }),
            fetch(sgpaUrl, { method: "POST", headers: HEADERS }),
            fetch(detailsUrl, { method: "POST", headers: HEADERS }),
        ]);

        if (!resultResponseData.ok || !sgpaReposeData.ok || !detailsRresponseData) {
            return res
                .status(resultResponseData.status || sgpaReposeData.status || detailsRresponseData.status)
                .json(new ApiResponse(
                    resultResponseData.status || sgpaReposeData.status || detailsRresponseData.status,
                    {},
                    `Error fetching data: ${resultResponseData.statusText || sgpaReposeData.statusText || detailsRresponseData.statusText}`
                ));
        }


        const [resultDetailsData, sgpaDetailsData, studentDetailsData] = await Promise.all([
            resultResponseData.json(),
            sgpaReposeData.json(),
            detailsRresponseData.json(),
        ]);

        if (!resultDetailsData || Object.keys(resultDetailsData).length === 0) {
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
                { studentDetailsData, resultDetailsData, sgpaDetailsData },
                "Successfully fetched data"
            ));

    } catch (error) {
        return res
            .status(500)
            .json(new ApiResponse(
                500,
                {},
                "Unable to Fetch the Data"
            ));
    }

})

const getResultsWithDetailsAndHtml = asyncHandler(async (req, res) => {
    const { rollno, semid, session } = req.query;

    if (!(rollno && semid && session)) {
        return res.status(404).json(new ApiResponse(404, {}, "Please provide rollNo, semid, and session."));
    }

    const isShortCode = session.length === 3 && /^[A-Z]\d+$/.test(session);
    const fullSessionName = isShortCode ? mapSessionCode(session) : session;

    if (!Object.keys(SHORT_CODE_SESSION).includes(fullSessionName)) {
        return res.status(400).json(new ApiResponse(400, { SHORT_CODE_SESSION }, "Invalid session code or session not recognized."));
    }

    const resultUrl = `${BPUT_URL}/student-results-subjects-list?semid=${semid}&rollNo=${rollno}&session=${fullSessionName}`;
    const sgpaUrl = `${BPUT_URL}/student-results-sgpa?rollNo=${rollno}&semid=${semid}&session=${fullSessionName}`;
    const detailsUrl = `${BPUT_URL}/student-detsils-results?rollNo=${rollno}`;

    try {
        const [resultResponse, sgpaResponse, detailsResponse] = await Promise.all([
            fetch(resultUrl, { method: "POST", headers: HEADERS }),
            fetch(sgpaUrl, { method: "POST", headers: HEADERS }),
            fetch(detailsUrl, { method: "POST", headers: HEADERS }),
        ]);

        if (!resultResponse.ok || !sgpaResponse.ok || !detailsResponse.ok) {
            return res.status(resultResponse.status || sgpaResponse.status || detailsResponse.status).json(
                new ApiResponse(
                    resultResponse.status || sgpaResponse.status || detailsResponse.status,
                    {},
                    `Error fetching data: ${resultResponse.statusText || sgpaResponse.statusText || detailsResponse.statusText || 'Unknown error'}`
                )
            );
        }

        const [resultDetails, sgpaDetails, studentDetails] = await Promise.all([
            resultResponse.json(),
            sgpaResponse.json(),
            detailsResponse.json(),
        ]);

        if (!resultDetails || Object.keys(resultDetails).length === 0) {
            return res.status(404).json(new ApiResponse(404, {}, "No data found."));
        }

        
        const htmlResponse = `
        <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Semester ${semid} Examination ${fullSessionName}</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            color: #333;
        }
        .container {
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
        }
        table {
            border-collapse: collapse;
            width: 100%;
            margin-top: 20px;
        }
        th, td {
            text-align: left;
            padding: 8px;
            border: 1px solid #ddd;
        }
        th {
            background-color: #f2f2f2;
        }
        tr:hover {
            background-color: #f5f5f5;
        }
        .print-button {
            display: block;
            margin: 20px 0;
            padding: 10px 20px;
            background-color: #002ed3;
            color: white;
            border: none;
            cursor: pointer;
            font-size: 16px;
        }
        .print-button:hover {
            background-color: #001bb3;
        }
        @media (max-width: 600px) {
            .container {
                padding: 10px;
            }
            table {
                font-size: 12px;
            }
        }
        @media print {
            /* Hide the print button */
            .print-button {
                display: none;
            }

            /* Optionally hide other elements that are not needed */
            body * {
                visibility: hidden; /* Hide everything */
            }
            .container, .container * {
                visibility: visible; /* Show only the container and its children */
            }
            .container {
                position: absolute; /* Position the container for printing */
                left: 0;
                top: 0;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Semester ${semid} Examination ${fullSessionName}</h1>
        <table class="tdcolor">
            <tr>
                <th scope="row">Reg. No</th>
                <td>${studentDetails?.rollNo || 'N/A'}</td>
            </tr>
            <tr>
                <th scope="row">Name</th>
                <td>${studentDetails?.studentName || 'N/A'}</td>
            </tr>
            <tr>
                <th scope="row">College</th>
                <td>${studentDetails?.collegeName || 'N/A'}</td>
            </tr>
            <tr>
                <th scope="row">Branch</th>
                <td>${studentDetails?.branchName || 'N/A'}</td>
            </tr>
            <tr>
                <th scope="row">Examination</th>
                <td>Semester - ${semid}, ${fullSessionName}</td>
            </tr>
        </table>

        <table>
            <tr>
                <th>S.No</th>
                <th>Subject Code</th>
                <th>Subject Name</th>
                <th>Type</th>
                <th>Credits</th>
                <th>Final Grade</th>
            </tr>
            ${resultDetails.map((subjectName, index) => `
                <tr>
                    <td>${index + 1}</td>
                    <td>${subjectName.subjectCODE}</td>
                    <td>${subjectName.subjectName}</td>
                    <td>${subjectName.subjectTP}</td>
                    <td>${subjectName.subjectCredits}</td>
                    <td>${subjectName.grade}</td>
                </tr>`).join('')}
            <tr>
                <td colspan="4"></td>
                <td>Total Credits: ${sgpaDetails.cretits}</td>
                <td>SGPA: ${sgpaDetails.sgpa}</td>
            </tr>
        </table>
        <button class="print-button" onclick="window.print()">Print</button>
    </div>
</body>
</html>
        `;

        return res.status(200).send(htmlResponse);

    } catch (error) {
        return res.status(500).json(new ApiResponse(500, {}, "Unable to Fetch the Data"));
    }
});


export {
    getResults,
    getCompleteResults,
    getResultsWithDetails,
    getResultsWithDetailsAndHtml
};
