import mongoose from 'mongoose';

const visitHistorySchema = new mongoose.Schema({
    ip: {
        type: String,
        required: true,
    },
    timestamp: {
        type: Date,
        default: Date.now,
    },
});

const VisitHistory = mongoose.model('VisitHistory', visitHistorySchema);

export { VisitHistory };
