import { VisitRoute, UserVisit } from "../models/apiUsage.model.js";
import { ApiError } from  "../utils/ApiError.js";

export const trackApiUsage = async ( req, res, next ) => {
    const ip = req.ip;
    const route = req.originalUrl;
    console.log(`Route: ${route}`);
    console.log(`IP: ${ip}`);
    
    try {
        let userRecord = await UserVisit.findOne({ ip });
        

        if (!userRecord) {
            userRecord = new UserVisit({ ip, lastVisit: Date.now() });
            await userRecord.save();
            
        } else {
            userRecord.lastVisit = Date.now();
            await userRecord.save();
            
        }

        let visitrecord = await VisitRoute.findOne({ route });
        

        if (visitrecord) {
            visitrecord.count += 1;
            
        } else {
            visitrecord = new VisitRoute({
                route,
                count: 1
            });
            
        }

        await visitrecord.save();
        

        next();

    } catch (error) {       
        return res
        .status(500)
        .json(new ApiResponse(
        500,
        {},
        "Server error"))
    }
};
