import express from "express";
import rateLimit from "express-rate-limit";
import { trackWebsiteVisit } from './middlewares/visitHistory.middleware.js';
import { trackApiRouteAccess } from './middlewares/routeHistory.middleware.js';
import { verifyApiToken } from "./middlewares/token.middleware.js";

// app.use("/api/v1/*", trackApiRouteAccess);

const app = express();

app.set('trust proxy', 1);

const apilimiter = rateLimit({
    windowMs: 5*60*1000,
    max: 100,
    message: `You have exceeded the 100 requests in a minutes Limit`
})

app.use(express.json());
app.use(trackWebsiteVisit);
// app.enable('trust proxy')
app.use((req, res, next) => {
    const realIp = req.headers['cf-connecting-ip'] || req.ip;
    console.log('Real IP:', realIp);
    console.log('header IP:', req.headers['cf-connecting-ip'] );
    console.log('req IP:', req.ip);
    next();
});


import resultRouter from './routes/result.routes.js';
import detailsRouter from "./routes/details.routes.js";
import examinfoRouter from "./routes/examinfo.routes.js";
import sgpaRouter from "./routes/sgpa.routes.js";
import allSessionRouter from "./routes/allsession.routes.js";
import visitRouter from "./routes/visit.routes.js";
import statusRouter from "./routes/status.routes.js";
import userRouter from "./routes/user.routes.js";
import otpRouter from "./routes/otp.routes.js";


app.use("/api/v1/result", verifyApiToken, apilimiter, trackApiRouteAccess, resultRouter);
app.use("/api/v1/details", verifyApiToken, apilimiter, trackApiRouteAccess, detailsRouter);
app.use("/api/v1/examinfo", verifyApiToken, apilimiter, trackApiRouteAccess, examinfoRouter);
app.use("/api/v1/sgpa", verifyApiToken, apilimiter, trackApiRouteAccess, sgpaRouter);


app.use("/api/v1/allsession", trackApiRouteAccess, allSessionRouter);

app.use("/api/v1/stats", visitRouter);
app.use("/api/v1/status", trackApiRouteAccess, statusRouter);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/otp", otpRouter);

export { app };


