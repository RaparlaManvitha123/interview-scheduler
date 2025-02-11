import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { InterviewContext } from "../context/InterviewContext";
import InterviewCard from "../components/InterviewCard";

const Dashboard = () => {
  const { interviews, deleteInterview } = useContext(InterviewContext);

  return (
    <div>
      <h1>Interview Dashboard</h1>
      <Link to="/create-interview">Schedule New Interview</Link>
      <div>
        {interviews.map((interview) => (
          <InterviewCard
            key={interview.id}
            interview={interview}
            onDelete={() => deleteInterview(interview.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
