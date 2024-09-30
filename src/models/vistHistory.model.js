import mongoose from 'mongoose';

const visitHistorySchema = new mongoose.Schema({
    ip: {
        type: String,
        required: true,
    },
    count: {
        type: Number,
        default: 1
    },
    firsttimestamp: {
        type: Date,
        default: Date.now,
    },
    lasttimestamp: {
        type: Date,
        default: Date.now,
    },
});

const VisitHistory = mongoose.model('VisitHistory', visitHistorySchema);

export { VisitHistory };
