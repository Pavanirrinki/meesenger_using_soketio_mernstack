const mongoose = require("mongoose");

const allmessengerSchema = new mongoose.Schema({
  participants:[{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  messages: [
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Messages",
        default: [],
    },
],
},);

const Conversation = mongoose.model("AllMessages", allmessengerSchema);
module.exports = Conversation; 