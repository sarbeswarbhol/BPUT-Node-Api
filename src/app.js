import express from "express";


const app = express()


//routes import
import resultRouter from './routes/result.routes.js'
import detailsRouter from "./routes/details.routes.js"
import examinfoRouter from "./routes/examinfo.routes.js"
import sgpaRouter from "./routes/sgpa.routes.js"
import allSessionRouter from "./routes/allsession.routes.js"

//routes declaration
app.use("/api/v1/result", resultRouter)
app.use("/api/v1/details", detailsRouter)
app.use("/api/v1/examinfo", examinfoRouter)
app.use("/api/v1/sgpa", sgpaRouter)
app.use("/api/v1/allsession", allSessionRouter)

export { app }