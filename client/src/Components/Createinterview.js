
import { useState, useEffect } from "react";
import Axios from "axios";
import Select from 'react-select'


function Createinterview(){
    const [listOfUsers, setListOfUsers] = useState([]);
    const [selectedParticipants, setSelectedParticipants] = useState([]);
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [scheduledInterviews, setScheduledInterviews] = useState([]);

  useEffect(() => {
    Axios.get("http://localhost:3001/getInterviews").then((response) => {
      setScheduledInterviews(response.data);
    });
    Axios.get("http://localhost:3001/getUsers").then((response) => {
      setListOfUsers(response.data);
    });

  }, []);

  const handleCreateInterview = async (event) => {
    event.preventDefault();
  
    if (selectedParticipants.length < 2) {
      alert('Please select at least two participants.');
      return;
    }
  
    const conflictingParticipants = selectedParticipants.filter((participant) =>
    scheduledInterviews.some(interview => interview.participants.includes(participant) && 
    (new Date(interview.startTime) <= new Date(startTime) && new Date(interview.endTime) >= new Date(startTime) || 
     new Date(interview.startTime) <= new Date(endTime) && new Date(interview.endTime) >= new Date(endTime)))
);
  
    if (conflictingParticipants.length > 0) {
      alert(`The following participants are not available at the scheduled time: ${conflictingParticipants.join(', ')}`);
      return;
    }
  
    const newInterview = {
      startTime,
      endTime,
      participants: selectedParticipants,
    };
  
    await Axios.post('http://localhost:3001/createInterview', newInterview);
  
    // redirect to the interviews list page
  };
  

    return (
        <div>
              <form onSubmit={handleCreateInterview}>
                  <label htmlFor="startTime">Start Time:</label>
                  <input type="datetime-local" id="startTime" name="startTime" value={startTime} onChange={(e) => setStartTime(e.target.value)} required />

                  <label htmlFor="endTime">End Time:</label>
                  <input type="datetime-local" id="endTime" name="endTime" value={endTime} onChange={(e) => setEndTime(e.target.value)} required />

                  <label htmlFor="participants">Participants:</label>
                  <label htmlFor="participants">Participants:</label>
                    <AsyncSelect
                      id="participants"
                      name="participants"
                      isMulti
                      cacheOptions
                      defaultOptions
                      value={selectedParticipants}
                      loadOptions={loadOptions}
                      onChange={handleParticipantsChange}
                      required
                    />

                  <button type="submit">Schedule Interview</button>
                </form>
            </div>
                    );
                };

export default Createinterview;