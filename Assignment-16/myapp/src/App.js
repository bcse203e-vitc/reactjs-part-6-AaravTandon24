import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Dashboard from "./components/Dashboard";
import SkillRoadmap from "./components/SkillRoadmap";
import Quizzes from "./components/Quizzes";
import { ProgressProvider } from "./contexts/ProgressContext";
import { ThemeProvider } from "./contexts/ThemeContext";
import "./styles.css";

function App() {
  return (
    <ThemeProvider>
      <ProgressProvider>
        <Router>
          <div className="app-container">
            <Header />
            <main className="main-content">
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/roadmap/:skillId" element={<SkillRoadmap />} />
                <Route path="/quiz/:moduleId" element={<Quizzes />} />
              </Routes>
            </main>
          </div>
        </Router>
      </ProgressProvider>
    </ThemeProvider>
  );
}

export default App;
