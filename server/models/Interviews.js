const mongoose = require('mongoose');

const InterviewSchema = new mongoose.Schema({
  participants: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'UserModel',
    required: true
  }],
  startTime: {
    type: Date,
    required: true
  },
  endTime: {
    type: Date,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

const InterviewModel = mongoose.model('Interview', InterviewSchema);

module.exports = InterviewModel;
