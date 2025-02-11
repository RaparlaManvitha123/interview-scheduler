import React, { createContext, useState, useEffect } from "react";

// Create context
const InterviewContext = createContext();

// Provider component
const InterviewProvider = ({ children }) => {
  const [interviews, setInterviews] = useState([]);

  // Load interviews from localStorage on component mount
  useEffect(() => {
    const savedInterviews = JSON.parse(localStorage.getItem("interviews"));
    if (savedInterviews) {
      setInterviews(savedInterviews);
    }
  }, []);

  // Save interviews to localStorage whenever the interviews state changes
  useEffect(() => {
    localStorage.setItem("interviews", JSON.stringify(interviews));
  }, [interviews]);

  // Function to add an interview
  const addInterview = (interview) => {
    setInterviews([...interviews, interview]);
  };

  // Function to update an interview
  const updateInterview = (id, updatedInterview) => {
    setInterviews(
      interviews.map((interview) =>
        interview.id === id ? { ...interview, ...updatedInterview } : interview
      )
    );
  };

  // Function to delete an interview
  const deleteInterview = (id) => {
    setInterviews(interviews.filter((interview) => interview.id !== id));
  };

  return (
    <InterviewContext.Provider
      value={{ interviews, addInterview, updateInterview, deleteInterview }}
    >
      {children}
    </InterviewContext.Provider>
  );
};

export { InterviewContext, InterviewProvider };
