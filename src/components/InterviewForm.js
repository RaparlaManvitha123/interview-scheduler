import React, { useState, useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { InterviewContext } from "../context/InterviewContext";

import "./InterviewForm.css";

const InterviewForm = ({ title, onSubmit }) => {
  const { addInterview, updateInterview, interviews } =
    useContext(InterviewContext);
  const [candidate, setCandidate] = useState("");
  const [interviewer, setInterviewer] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [type, setType] = useState("Technical");

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      const interview = interviews.find(
        (interview) => interview.id === parseInt(id)
      );
      if (interview) {
        setCandidate(interview.candidate);
        setInterviewer(interview.interviewer);
        setDate(interview.date);
        setTime(interview.time);
        setType(interview.type);
      }
    }
  }, [id, interviews]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const newInterview = {
      id: id ? parseInt(id) : Date.now(), // If editing, use the existing ID
      candidate,
      interviewer,
      date,
      time,
      type,
    };

    // Conflict check
    const isConflict = interviews.some(
      (interview) =>
        (interview.candidate === candidate &&
          interview.date === date &&
          interview.time === time) ||
        (interview.interviewer === interviewer &&
          interview.date === date &&
          interview.time === time)
    );

    if (isConflict) {
      alert("This time slot is already booked. Please choose another.");
    } else {
      if (id) {
        updateInterview(id, newInterview);
      } else {
        addInterview(newInterview);
      }
      navigate("/");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>{title}</h2>
      <label>
        Candidate Name:
        <input
          type="text"
          value={candidate}
          onChange={(e) => setCandidate(e.target.value)}
        />
      </label>
      <label>
        Interviewer Name:
        <input
          type="text"
          value={interviewer}
          onChange={(e) => setInterviewer(e.target.value)}
        />
      </label>
      <label>
        Date:
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </label>
      <label>
        Time:
        <input
          type="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
        />
      </label>
      <label>
        Interview Type:
        <select value={type} onChange={(e) => setType(e.target.value)}>
          <option value="Technical">Technical</option>
          <option value="HR">HR</option>
          <option value="Behavioral">Behavioral</option>
        </select>
      </label>
      <button type="submit">Submit</button>
    </form>
  );
};

export default InterviewForm;
