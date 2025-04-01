import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ProgressContext } from "../contexts/ProgressContext";
import SkillSelection from "./SkillSelection";

const skillsData = [
  {
    id: "web-dev",
    name: "Web Development",
    icon: "🌐",
    description: "Learn HTML, CSS, JavaScript and frameworks.",
  },
  {
    id: "data-science",
    name: "Data Science",
    icon: "📊",
    description: "Learn statistics, Python and machine learning.",
  },
  {
    id: "cybersecurity",
    name: "Cybersecurity",
    icon: "🔒",
    description: "Learn network security, ethical hacking and more.",
  },
  {
    id: "mobile-dev",
    name: "Mobile Development",
    icon: "📱",
    description: "Learn to build iOS and Android applications.",
  },
];

const Dashboard = () => {
  const { progress, selectSkill } = useContext(ProgressContext);
  const navigate = useNavigate();
  const [streakMessage, setStreakMessage] = useState("");

  useEffect(() => {
    // Display streak message if user has a streak
    if (progress.streak > 0) {
      setStreakMessage(`🔥 ${progress.streak} day streak! Keep it up!`);
    }
  }, [progress.streak]);

  const handleSkillSelect = (skillId) => {
    selectSkill(skillId);
    navigate(`/roadmap/${skillId}`);
  };

  const completionPercentage = progress.selectedSkill
    ? Math.round((progress.completedModules.length / 5) * 100)
    : 0;

  return (
    <div className="dashboard">
      <section className="welcome-section">
        <h1>Welcome to Your Learning Journey</h1>
        <p>Select a skill below to start your personalized learning pathway.</p>

        {streakMessage && <div className="streak-banner">{streakMessage}</div>}
      </section>

      {progress.selectedSkill ? (
        <section className="current-progress">
          <h2>Continue Learning</h2>
          <div className="progress-card">
            <h3>
              {skillsData.find((s) => s.id === progress.selectedSkill)?.name}
            </h3>
            <div className="progress-bar-container">
              <div
                className="progress-bar"
                style={{ width: `${completionPercentage}%` }}
              ></div>
            </div>
            <p>{completionPercentage}% Complete</p>
            <button
              className="continue-btn"
              onClick={() => navigate(`/roadmap/${progress.selectedSkill}`)}
            >
              Continue Learning
            </button>
          </div>

          <div className="switch-skill">
            <p>Want to learn something else?</p>
            <SkillSelection
              skills={skillsData}
              onSelectSkill={handleSkillSelect}
            />
          </div>
        </section>
      ) : (
        <SkillSelection skills={skillsData} onSelectSkill={handleSkillSelect} />
      )}

      {progress.badges && progress.badges.length > 0 && (
        <section className="recent-achievements">
          <h2>Your Achievements</h2>
          <div className="badges-container">
            {progress.badges.map((badgeId) => (
              <div key={badgeId} className="badge-item">
                {badgeId === "first-module" && "🎯 First Step"}
                {badgeId === "first-quiz" && "🧠 Quiz Master"}
                {badgeId === "three-day-streak" && "🔥 3-Day Streak"}
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default Dashboard;
