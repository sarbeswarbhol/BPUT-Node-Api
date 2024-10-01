import mongoose from 'mongoose';

const apiTokenSchema = new mongoose.Schema({
    token: {
        type: String,
        required: true,
        unique: true
    },
    username: {
        type: String,
        unique: true,
        required: true
    },
    email: {
        type: String, 
        required: true
    },
    dailyLimit: {
        type: Number,
        default: 1000,
    },
    expirationDate: {
        type: Date,
        required: true
    },
    usageToday: {
        type: Number,
        default: 0
    },
    lastUsed: {
        type: Date
    }
});


const ApiToken = mongoose.model('ApiToken', apiTokenSchema);
export { ApiToken };
