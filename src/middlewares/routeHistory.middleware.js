import { ApiRouteAccess } from '../models/routeHistory.model.js';

export const trackApiRouteAccess = async (req, res, next) => {
    const ip = req.ip;
    const route = req.baseUrl + req.path;
    console.log(`Route: ${route}`);

    try {
        // Save route access with the IP, route, and timestamp
        const routeAccess = new ApiRouteAccess({ ip, route });
        await routeAccess.save();

        next(); // Continue to the next middleware/route
    } catch (error) {
        console.error('Error tracking API route access:', error);
        res.status(500).json({ message: 'Server error while tracking API route access' });
    }
};
