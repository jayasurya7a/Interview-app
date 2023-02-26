const isParticipantScheduled = async (participants, startTime, endTime) => {
    for (let i = 0; i < participants.length; i++) {
      const participantId = participants[i];
      const existingInterviews = await InterviewModel.find({
        participants: participantId,
        $or: [
          { startTime: { $lte: startTime }, endTime: { $gte: startTime } },
          { startTime: { $gte: startTime }, endTime: { $lte: endTime } },
          { startTime: { $lte: endTime }, endTime: { $gte: endTime } },
        ],
      });
      if (existingInterviews.length > 0) {
        return true;
      }
    }
    return false;
  };

module.exports = {isParticipantScheduled};