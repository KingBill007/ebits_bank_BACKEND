const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    fName: {
        type: String,
    },
    lName: {
        type: String,
    },
    email:{
        type: String,
    },
    password: {
        type: String,
    },
    pNumber:{
        type: String
    },
    savingsAccNum:{type: Number},
    currentAccNum:{type:Number}
})
exports.User = mongoose.model('User', userSchema)