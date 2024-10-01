// import express from "express";
// import { trackApiUsage } from "./middlewares/trackApiUsage.middleware.js";

// const app = express()


// //routes import
// import resultRouter from './routes/result.routes.js'
// import detailsRouter from "./routes/details.routes.js"
// import examinfoRouter from "./routes/examinfo.routes.js"
// import sgpaRouter from "./routes/sgpa.routes.js"
// import allSessionRouter from "./routes/allsession.routes.js"

// //routes declaration
// app.use("/api/v1/result", trackApiUsage, resultRouter)
// app.use("/api/v1/details", trackApiUsage, detailsRouter)
// app.use("/api/v1/examinfo", trackApiUsage, examinfoRouter)
// app.use("/api/v1/sgpa", trackApiUsage, sgpaRouter)
// app.use("/api/v1/allsession", trackApiUsage, allSessionRouter)

// export { app }



import express from "express";
import rateLimit from "express-rate-limit";
import { trackWebsiteVisit } from './middlewares/visitHistory.middleware.js';
import { trackApiRouteAccess } from './middlewares/routeHistory.middleware.js';
import { verifyApiToken } from "./middlewares/token.middleware.js";

// app.use("/api/v1/*", trackApiRouteAccess);

const app = express();

app.set('trust proxy', 1);

const apilimiter = rateLimit({
    windowMs: 1*60*1000,
    max: 2,
    message: `You have exceeded the 2 requests in a minutes Limit`
})

app.use(express.json());
app.use(trackWebsiteVisit);
// app.enable('trust proxy')

import resultRouter from './routes/result.routes.js';
import detailsRouter from "./routes/details.routes.js";
import examinfoRouter from "./routes/examinfo.routes.js";
import sgpaRouter from "./routes/sgpa.routes.js";
import allSessionRouter from "./routes/allsession.routes.js";
import visitRouter from "./routes/visit.routes.js";


app.use("/api/v1/result", verifyApiToken, apilimiter, trackApiRouteAccess, resultRouter);
app.use("/api/v1/details", verifyApiToken, apilimiter, trackApiRouteAccess, detailsRouter);
app.use("/api/v1/examinfo", verifyApiToken, apilimiter, trackApiRouteAccess, examinfoRouter);
app.use("/api/v1/sgpa", verifyApiToken, apilimiter, trackApiRouteAccess, sgpaRouter);


app.use("/api/v1/allsession", trackApiRouteAccess, allSessionRouter);

app.use("/api/v1/stats", visitRouter);

export { app };


