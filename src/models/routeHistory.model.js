import mongoose from 'mongoose';

const apiRouteAccessSchema = new mongoose.Schema({
    route: {
        type: String,
        required: true,
    },
    ip: {
        type: String,
        required: true,
    },
    timestamp: {
        type: Date,
        default: Date.now,
    },
});

const ApiRouteAccess = mongoose.model('ApiRouteAccess', apiRouteAccessSchema);

export { ApiRouteAccess };
