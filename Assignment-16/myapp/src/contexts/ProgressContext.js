import React, { createContext, useState, useEffect } from "react";

export const ProgressContext = createContext();

export const ProgressProvider = ({ children }) => {
  const [progress, setProgress] = useState(() => {
    const savedProgress = localStorage.getItem("learningProgress");
    return savedProgress
      ? JSON.parse(savedProgress)
      : {
          selectedSkill: null,
          completedModules: [],
          quizScores: {},
          streak: 0,
          lastActivityDate: null,
          xpPoints: 0,
          badges: [],
        };
  });

  useEffect(() => {
    localStorage.setItem("learningProgress", JSON.stringify(progress));
  }, [progress]);

  const updateProgress = (moduleId) => {
    setProgress((prev) => {
      // Don't add if already completed
      if (prev.completedModules.includes(moduleId)) {
        return prev;
      }

      // Update streak
      const today = new Date().toDateString();
      const isNewDay = prev.lastActivityDate !== today;

      return {
        ...prev,
        completedModules: [...prev.completedModules, moduleId],
        streak: isNewDay ? prev.streak + 1 : prev.streak,
        lastActivityDate: today,
        xpPoints: prev.xpPoints + 10, // Give XP for completing a module
      };
    });
  };

  const setQuizScore = (quizId, score, totalQuestions) => {
    setProgress((prev) => {
      const newXp = score > 0 ? Math.round((score / totalQuestions) * 20) : 0;

      return {
        ...prev,
        quizScores: {
          ...prev.quizScores,
          [quizId]: score,
        },
        xpPoints: prev.xpPoints + newXp,
      };
    });
  };

  const selectSkill = (skillId) => {
    setProgress((prev) => ({
      ...prev,
      selectedSkill: skillId,
    }));
  };

  const checkAndAddBadge = (badgeId) => {
    setProgress((prev) => {
      if (prev.badges.includes(badgeId)) {
        return prev;
      }
      return {
        ...prev,
        badges: [...prev.badges, badgeId],
      };
    });
  };

  return (
    <ProgressContext.Provider
      value={{
        progress,
        updateProgress,
        setQuizScore,
        selectSkill,
        checkAndAddBadge,
      }}
    >
      {children}
    </ProgressContext.Provider>
  );
};
