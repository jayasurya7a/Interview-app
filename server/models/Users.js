const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
  },
});

const interviewSchema = new mongoose.Schema({
  participants: [UserSchema],
  startTime: {
    type: Date,
    required: true
  },
  endTime: {
    type: Date,
    required: true
  }
});

const UserModel = mongoose.model("users", UserSchema);
module.exports = UserModel;