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
           const newVisit = new VisitHistory({
            ip,
            timestamp: new Date()
           }) 
           await newVisit.save();
        } else {
            visitHistoryFind.count += 1;
            await visitHistoryFind.save()
        }


        next();
    } catch (error) {
        console.error('Error tracking website visit:', error);
        res.status(500).json({ message: 'Server error while tracking website visit' });
    }
};
