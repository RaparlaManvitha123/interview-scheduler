import React from "react";
import { Link } from "react-router-dom";
import "./InterviewCard.css";

const InterviewCard = ({ interview, onDelete }) => {
  return (
    <div>
      <h3>
        {interview.candidate} - {interview.interviewer}
      </h3>
      <p>
        {interview.date} at {interview.time}
      </p>
      <p>Interview Type: {interview.type}</p>
      <Link to={`/edit-interview/${interview.id}`}>Edit</Link>
      <br />
      <button className="delete-button" onClick={() => onDelete(interview.id)}>
        Delete
      </button>
    </div>
  );
};

export default InterviewCard;
