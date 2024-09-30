import { VisitHistory } from "../models/vistHistory.model.js";

export const trackWebsiteVisit = async (req, res, next) => {
    const ip = req.ip;
    const route = req.originalUrl;
    console.log(`IP: ${ip}`);
    // console.log(`Request: ${req}`);

    if (route.startsWith("/api/v1/stats") || route.startsWith("/api/v1/auth")) {
        return next();
    }
    try {
        const visitHistoryFind = await VisitHistory.findOne({ ip });

        if (!visitHistoryFind) {
            await VisitHistory.create({ ip });
        } else {
            visitHistoryFind.count += 1;
            visitHistoryFind.lasttimestamp = Date.now();
            await visitHistoryFind.save()
        }
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
