import React, { useContext, useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { ProgressContext } from "../contexts/ProgressContext";

// Mock data for roadmap modules - in a real app, this would come from an API or database
const roadmapData = {
  "web-dev": [
    {
      id: "web-dev-1",
      title: "HTML & CSS Fundamentals",
      description:
        "Learn the basics of HTML and CSS to structure and style web pages.",
      resources: [
        { type: "video", title: "HTML Crash Course", url: "#" },
        { type: "article", title: "CSS Box Model Explained", url: "#" },
      ],
      quiz: "quiz-web-dev-1",
    },
    {
      id: "web-dev-2",
      title: "JavaScript Essentials",
      description: "Master the core concepts of JavaScript programming.",
      resources: [
        { type: "video", title: "JavaScript for Beginners", url: "#" },
        { type: "article", title: "Working with the DOM", url: "#" },
      ],
      quiz: "quiz-web-dev-2",
    },
    {
      id: "web-dev-3",
      title: "Responsive Web Design",
      description: "Create websites that work on all devices and screen sizes.",
      resources: [
        { type: "video", title: "Media Queries Explained", url: "#" },
        { type: "article", title: "Flexbox vs Grid", url: "#" },
      ],
      quiz: "quiz-web-dev-3",
    },
    {
      id: "web-dev-4",
      title: "Frontend Frameworks",
      description:
        "Learn React, Vue, or Angular to build modern web applications.",
      resources: [
        { type: "video", title: "React Fundamentals", url: "#" },
        { type: "article", title: "State Management", url: "#" },
      ],
      quiz: "quiz-web-dev-4",
    },
    {
      id: "web-dev-5",
      title: "Backend Integration",
      description: "Connect your frontend to APIs and databases.",
      resources: [
        { type: "video", title: "RESTful APIs", url: "#" },
        { type: "article", title: "Authentication Basics", url: "#" },
      ],
      quiz: "quiz-web-dev-5",
    },
  ],
  "data-science": [
    // Similar structure for data science modules
    {
      id: "data-science-1",
      title: "Python Programming Basics",
      description: "Learn the fundamentals of Python for data analysis.",
      resources: [
        { type: "video", title: "Python for Data Science", url: "#" },
        { type: "article", title: "Working with Pandas", url: "#" },
      ],
      quiz: "quiz-data-science-1",
    },
    // ... more modules
  ],
  cybersecurity: [
    // Similar structure for cybersecurity modules
    {
      id: "cybersecurity-1",
      title: "Network Security Fundamentals",
      description: "Learn the basics of network security and threat models.",
      resources: [
        { type: "video", title: "Introduction to Network Security", url: "#" },
        { type: "article", title: "Common Network Attacks", url: "#" },
      ],
      quiz: "quiz-cybersecurity-1",
    },
    // ... more modules
  ],
  "mobile-dev": [
    // Similar structure for mobile development modules
    {
      id: "mobile-dev-1",
      title: "Mobile UI Design Principles",
      description: "Learn the fundamentals of designing for mobile screens.",
      resources: [
        { type: "video", title: "Mobile UI/UX Fundamentals", url: "#" },
        { type: "article", title: "Responsive vs Adaptive Design", url: "#" },
      ],
      quiz: "quiz-mobile-dev-1",
    },
    // ... more modules
  ],
};

const SkillRoadmap = () => {
  const { skillId } = useParams();
  const { progress, updateProgress, checkAndAddBadge } =
    useContext(ProgressContext);
  const [modules, setModules] = useState([]);

  useEffect(() => {
    // Fetch roadmap data
    if (skillId && roadmapData[skillId]) {
      setModules(roadmapData[skillId]);
    }
  }, [skillId]);

  const handleCompleteModule = (moduleId) => {
    updateProgress(moduleId);

    // Check for first module badge
    if (progress.completedModules.length === 0) {
      checkAndAddBadge("first-module");
    }

    // Check for 3-day streak badge
    if (progress.streak === 3) {
      checkAndAddBadge("three-day-streak");
    }
  };

  const isModuleCompleted = (moduleId) => {
    return progress.completedModules.includes(moduleId);
  };

  const isModuleAvailable = (index) => {
    if (index === 0) return true;
    return isModuleCompleted(modules[index - 1]?.id);
  };

  return (
    <div className="roadmap-container">
      <h1>
        Learning Pathway:{" "}
        {skillId &&
          skillId.replace("-", " ").replace(/\b\w/g, (l) => l.toUpperCase())}
      </h1>

      <div className="modules-timeline">
        {modules.map((module, index) => {
          const completed = isModuleCompleted(module.id);
          const available = isModuleAvailable(index);

          return (
            <div
              key={module.id}
              className={`module-card ${completed ? "completed" : ""} ${
                !available ? "locked" : ""
              }`}
            >
              <div className="module-status">
                {completed ? "✅" : available ? `${index + 1}` : "🔒"}
              </div>

              <div className="module-content">
                <h3>{module.title}</h3>
                <p>{module.description}</p>

                {available && (
                  <div className="module-resources">
                    <h4>Learning Resources:</h4>
                    <ul>
                      {module.resources.map((resource, i) => (
                        <li key={i}>
                          <span className={`resource-type ${resource.type}`}>
                            {resource.type === "video" ? "🎥" : "📄"}
                          </span>
                          <a href={resource.url}>{resource.title}</a>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="module-actions">
                  {available && !completed && (
                    <button
                      className="complete-btn"
                      onClick={() => handleCompleteModule(module.id)}
                    >
                      Mark as Complete
                    </button>
                  )}

                  {available && (
                    <Link
                      to={`/quiz/${module.quiz}`}
                      className={`quiz-btn ${!completed ? "secondary" : ""}`}
                    >
                      Take Quiz
                    </Link>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {modules.every((module) => isModuleCompleted(module.id)) && (
        <div className="completion-banner">
          <h2>🎉 Congratulations!</h2>
          <p>You've completed all modules for this skill.</p>
          <Link to="/certificate" className="certificate-btn">
            Get Your Certificate
          </Link>
        </div>
      )}
    </div>
  );
};

export default SkillRoadmap;
