import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import CreateInterview from "./pages/CreateInterview";
import EditInterview from "./pages/EditInterview";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/create-interview" element={<CreateInterview />} />
        <Route path="/edit-interview/:id" element={<EditInterview />} />
      </Routes>
    </Router>
  );
}

export default App;
