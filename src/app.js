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
import { trackWebsiteVisit } from './middlewares/visitHistory.middleware.js';
import { trackApiRouteAccess } from './middlewares/routeHistory.middleware.js';

const app = express();

app.use(trackWebsiteVisit);

// app.use("/api/v1/*", trackApiRouteAccess);


import resultRouter from './routes/result.routes.js';
import detailsRouter from "./routes/details.routes.js";
import examinfoRouter from "./routes/examinfo.routes.js";
import sgpaRouter from "./routes/sgpa.routes.js";
import allSessionRouter from "./routes/allsession.routes.js";
import visitRouter from "./routes/visit.routes.js";


app.use("/api/v1/result", trackApiRouteAccess, resultRouter);
app.use("/api/v1/details", trackApiRouteAccess, detailsRouter);
app.use("/api/v1/examinfo", trackApiRouteAccess, examinfoRouter);
app.use("/api/v1/sgpa", trackApiRouteAccess, sgpaRouter);
app.use("/api/v1/allsession", trackApiRouteAccess, allSessionRouter);
app.use("/api/v1/stats", visitRouter);

export { app };


