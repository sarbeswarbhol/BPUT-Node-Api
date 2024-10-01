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

const visitCountSchema = new mongoose.Schema({
    date: {
        type: Date,
        required: true,
        unique: true,
    },
    count: {
        type: Number,
        default: 0,
    }
});
const VisitHistory = mongoose.model('VisitHistory', visitHistorySchema);
const VisitCount = mongoose.model('VisitCount', visitCountSchema);

export { VisitHistory, VisitCount };
