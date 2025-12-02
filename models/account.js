const mongoose = require('mongoose');

const accountSchema = mongoose.Schema({
    accNumber: {
        type: Number,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    Value:{
        type: Number,
        min: 0,
        default: 0,
    },
    accType: {
        type: String,
    }
})
exports.Account = mongoose.model('Account', accountSchema)