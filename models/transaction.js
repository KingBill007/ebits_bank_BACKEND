const mongoose = require('mongoose');

const transactionSchema = mongoose.Schema({
    accNumber: {
        type: Number,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    accId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Account"
    },
    Value:{
        type: String,
    },
    accType: {
        type: String,
        enum: ['Savings', 'Current'],
    },
    description: {
        type: String,
    },
    date: {
        type: Date,
        default: Date.now
    }
})
exports.Transaction = mongoose.model('Transaction', transactionSchema)
