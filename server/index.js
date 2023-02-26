const express =require("express");
const app = express();
const mongoose = require('mongoose');
const UserModel = require('./models/Users');
const InterviewModel = require('./models/Interviews');
const { isParticipantScheduled } = require('./utils');

const cors = require('cors');

app.use(express.json());
app.use(cors());

mongoose.connect("mongodb+srv://admin123:Surya7a@cluster1.wbpoyji.mongodb.net/mern?retryWrites=true&w=majority");

app.get("/getUsers", (req, res) => {
    UserModel.find({}, (err, result) => {
      if (err) {
        res.json(err);
      } else {
        res.json(result);
      }
    });
  });
  
  app.post("/createUser", async (req, res) => {
    const user = req.body;
    const newUser = new UserModel(user);
    await newUser.save();
  
    res.json(user);
  });

  app.post("/createInterview", async (req, res) => {
    const { participants, startTime, endTime } = req.body;
  
    // Check if there are at least two participants
    if (participants.length < 2) {
      return res.status(400).json({ error: "At least 2 participants are required" });
    }

    const scheduledParticipant = await isParticipantScheduled(participants, startTime, endTime);

    if (scheduledParticipant) {
      return res.status(400).json({ error: `${scheduledParticipant} is already scheduled for another interview during the given time` });
    }
  
    const newInterview = new InterviewModel({
      participants,
      startTime,
      endTime
    });
  
    // Save the interview to the database
    await newInterview.save();
  
    res.json(newInterview);
  });
  
  app.get("/getInterviews/:participant/:startTime/:endTime", (req, res) => {
    const participant = req.params.participant;
    const startTime = req.params.startTime;
    const endTime = req.params.endTime;
  
    Interview.find(
      {
        participants: { $in: [participant] },
        $or: [
          {
            startTime: { $gte: new Date(startTime), $lt: new Date(endTime) },
          },
          {
            endTime: { $gt: new Date(startTime), $lte: new Date(endTime) },
          },
          {
            startTime: { $lte: new Date(startTime) },
            endTime: { $gte: new Date(endTime) },
          },
        ],
      },
      (err, result) => {
        if (err) {
          res.send(err);
        } else {
          res.send(result);
        }
      }
    );
  });
  

  

  app.listen(3001, () => {
    console.log("SERVER RUNS PERFECTLY!");
  });