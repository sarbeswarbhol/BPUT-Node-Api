import { VisitHistory, VisitCount } from "../models/vistHistory.model.js";

export const trackWebsiteVisit = async (req, res, next) => {
    const ip = req.ip;
    const route = req.originalUrl;

    const currentDate = new Date();
    const istOffset = 5.5 * 60 * 60 * 1000;
    const istDate = new Date(currentDate.getTime() + istOffset);
    // console.log(istDate)
    const formattedDateOnly = istDate.toISOString().split('T')[0];


    console.log(`IP: ${ip}`);
    // console.log(`Request: ${req}`);
    // console.log("Dateonly", formattedDateOnly);

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

        await VisitCount.findOneAndUpdate(
            { date: formattedDateOnly },
            { $inc: { count: 1 } },
            { new: true, upsert: true }
        );

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
