import mongoose from "mongoose"


const apiRouteUse = new mongoose.Schema({
    route: {
        type: String,
        required: true
    },
    count: {
        type: Number,
        default: 0
    }
},{ timeseries: true})


const apiVisit = new mongoose.Schema({
    ip: {
        type: String,
        required: true,
        unique: true
    },
    lastVisit: {
        type: Date,
        default: Date.now
    }
},{ timestamps: true})


export const VisitRoute = mongoose.model("VisitRoute", apiRouteUse)
export const UserVisit = mongoose.model("UserVisit", apiVisit)