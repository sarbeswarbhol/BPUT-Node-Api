import { VisitHistory } from "../models/vistHistory.model.js";

export const trackWebsiteVisit = async (req, res, next) => {
    const ip = req.ip;

    try {
        // Save the visit history with IP and timestamp
        const visitHistoryFind = await VisitHistory.findOne({ ip });
        if (!visitHistoryFind) {
           const newVisit = new VisitHistory({
            ip,
            timestamp: new Date()
           }) 

           await newVisit.save();
        }


        next();
    } catch (error) {
        console.error('Error tracking website visit:', error);
        res.status(500).json({ message: 'Server error while tracking website visit' });
    }
};
