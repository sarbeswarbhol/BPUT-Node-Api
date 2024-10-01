import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiToken } from "../models/apitoken.model.js";
import jwt from "jsonwebtoken";

const generateApiToken = asyncHandler(async (req, res) => {
    const { username, email, exp } = req.query || req.body

    console.log(username);
    console.log(email);
    
    if (!username || !email) {
        return res.status(400).json(new ApiResponse(
            400,
            {},
            "Provide both username and email."
        ));
    }

    try {
        // Check if username already exists
        const existingToken = await ApiToken.findOne({ username });

        // If the username exists, check if the token has expired
        if (existingToken) {
            const currentTime = Date.now();
            const expirationDate = new Date(existingToken.expirationDate);

            // If the token has not expired, return a message
            if (currentTime < expirationDate) {
                return res.status(409).json(new ApiResponse(
                    409,
                    {},
                    "Username already exists and token is still valid."
                ));
            }

            // If expired, we can update the existing token
            console.log("Existing token has expired. Generating a new token.");
        }

        // Set expiration time (default to process.env.ACCESS_TOKEN_EXPIRY if not provided)
        const tokenExpiration = exp || process.env.ACCESS_TOKEN_EXPIRY;

        // Generate JWT token with the specified expiration time
        const token = jwt.sign(
            { username, email },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: tokenExpiration }
        );

        console.log(token);

        if (!token) {
            return res.status(501).json(new ApiResponse(
                501,
                {},
                "Unable to create the token"
            ));
        }

        // Calculate expiration date
        const expiryDuration = parseInt(tokenExpiration);
        const isDays = tokenExpiration.endsWith('d');
        const isHours = tokenExpiration.endsWith('h');
        const isMinutes = tokenExpiration.endsWith('m');
        const isSeconds = tokenExpiration.endsWith('s');

        const expirationDate = new Date(Date.now() + (expiryDuration * (isDays ? 86400000 : isHours ? 3600000 : isMinutes ? 60000 : isSeconds ? 1000 : 0)));

        // Save or update the token in the database
        if (existingToken) {
            // Update the existing token
            existingToken.token = token;
            existingToken.expirationDate = expirationDate;
            await existingToken.save();
            return res.status(200).json(new ApiResponse(
                200,
                {
                    token,
                    expirationDate
                },
                "Existing token was expired. A new token has been generated successfully."
            ));
        } else {
            // Save the new token
            const newToken = new ApiToken({
                token,
                username,
                email,
                expirationDate
            });
            await newToken.save();
            return res.status(200).json(new ApiResponse(
                200,
                {
                    token,
                    expirationDate
                },
                "Token generated successfully."
            ));
        }

    } catch (error) {
        console.error("Error generating token:", error);
        return res.status(500).json(new ApiResponse(
            500,
            {},
            "An error occurred while generating the token."
        ));
    }
});

export { generateApiToken };
