const mongoose = require("mongoose");

const messengerSchema = new mongoose.Schema({
    message: {
        type: String,
        required: true
    },
    creater: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    receiver: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },

}, {
    timestamps: true
});

const messagemodel = mongoose.model("Messages", messengerSchema);
module.exports = messagemodel; 