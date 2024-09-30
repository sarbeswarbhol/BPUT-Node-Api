import { ApiRouteAccess } from '../models/routeHistory.model.js';

export const trackApiRouteAccess = async (req, res, next) => {
    const ip = req.ip;
    const route = req.baseUrl + req.path;
    console.log(`Route: ${route}`);

    try {
        const routeAccess = new ApiRouteAccess({ ip, route });
        await routeAccess.save();

        next(); 
    } catch (error) {
        return res
        .status(500)
        .json(new ApiResponse(
        500,
        {},
        "Server error while tracking API route access"))
    }
};
