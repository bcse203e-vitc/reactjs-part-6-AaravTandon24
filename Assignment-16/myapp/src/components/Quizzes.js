import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ProgressContext } from "../contexts/ProgressContext";

// Quiz data - in a real app, this would come from an API
const quizzesData = {
  "quiz-web-dev-1": {
    title: "HTML & CSS Basics Quiz",
    questions: [
      {
        id: "q1",
        question: "Which HTML tag is used to create a hyperlink?",
        options: ["<link>", "<a>", "<href>", "<url>"],
        correctAnswer: "<a>",
      },
      {
        id: "q2",
        question: "Which CSS property is used to change the text color?",
        options: ["font-color", "text-color", "color", "text-style"],
        correctAnswer: "color",
      },
      {
        id: "q3",
        question: "What does CSS stand for?",
        options: [
          "Cascading Style Sheets",
          "Creative Style Sheets",
          "Computer Style Sheets",
          "Colorful Style Sheets",
        ],
        correctAnswer: "Cascading Style Sheets",
      },
    ],
  },
  "quiz-web-dev-2": {
    title: "JavaScript Basics Quiz",
    questions: [
      {
        id: "q1",
        question: "Which function is used to print content to the console?",
        options: ["console.print()", "print()", "console.log()", "log()"],
        correctAnswer: "console.log()",
      },
      {
        id: "q2",
        question: "How do you declare a variable in JavaScript?",
        options: ["var", "let", "const", "All of the above"],
        correctAnswer: "All of the above",
      },
      {
        id: "q3",
        question: "What is the correct way to write a JavaScript array?",
        options: [
          'var colors = "red", "green", "blue"',
          'var colors = ["red", "green", "blue"]',
          'var colors = (1:"red", 2:"green", 3:"blue")',
          'var colors = {"red", "green", "blue"}',
        ],
        correctAnswer: 'var colors = ["red", "green", "blue"]',
      },
    ],
  },
  // More quizzes for other modules...
};

const Quizzes = () => {
  const { moduleId } = useParams();
  const navigate = useNavigate();
  const { setQuizScore, checkAndAddBadge } = useContext(ProgressContext);
  const [quiz, setQuiz] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);

  useEffect(() => {
    // Fetch quiz data
    if (moduleId && quizzesData[moduleId]) {
      setQuiz(quizzesData[moduleId]);
      setCurrentQuestion(0);
      setSelectedAnswers({});
      setShowResults(false);
      setScore(0);
    }
  }, [moduleId]);

  if (!quiz) {
    return <div className="loading">Loading quiz...</div>;
  }

  const handleOptionSelect = (questionId, option) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [questionId]: option,
    });
  };

  const handleNextQuestion = () => {
    if (currentQuestion < quiz.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Calculate score
      let correctAnswers = 0;
      quiz.questions.forEach((question) => {
        if (selectedAnswers[question.id] === question.correctAnswer) {
          correctAnswers++;
        }
      });

      const finalScore = Math.round(
        (correctAnswers / quiz.questions.length) * 100
      );
      setScore(finalScore);
      setShowResults(true);

      // Save score to context
      setQuizScore(moduleId, finalScore, quiz.questions.length);

      // Check for first quiz badge
      checkAndAddBadge("first-quiz");
    }
  };

  const handleRetry = () => {
    setCurrentQuestion(0);
    setSelectedAnswers({});
    setShowResults(false);
  };

  const currentQuestionData = quiz.questions[currentQuestion];

  return (
    <div className="quiz-container">
      <h1>{quiz.title}</h1>

      {!showResults ? (
        <div className="question-card">
          <div className="question-progress">
            Question {currentQuestion + 1} of {quiz.questions.length}
          </div>

          <h2>{currentQuestionData.question}</h2>

          <div className="options-list">
            {currentQuestionData.options.map((option, index) => (
              <div
                key={index}
                className={`option-item ${
                  selectedAnswers[currentQuestionData.id] === option
                    ? "selected"
                    : ""
                }`}
                onClick={() =>
                  handleOptionSelect(currentQuestionData.id, option)
                }
              >
                {option}
              </div>
            ))}
          </div>

          <button
            className="next-question-btn"
            onClick={handleNextQuestion}
            disabled={!selectedAnswers[currentQuestionData.id]}
          >
            {currentQuestion < quiz.questions.length - 1
              ? "Next Question"
              : "Finish Quiz"}
          </button>
        </div>
      ) : (
        <div className="results-card">
          <h2>Quiz Results</h2>

          <div className="score-display">
            <div className="score-circle">
              <span className="score-text">{score}%</span>
            </div>
          </div>

          <div className="result-message">
            {score >= 80 ? (
              <p>Great job! You've mastered this topic.</p>
            ) : score >= 50 ? (
              <p>Good effort! Review the material and try again to improve.</p>
            ) : (
              <p>Keep learning! Review the module content and try again.</p>
            )}
          </div>

          <div className="quiz-review">
            <h3>Review Your Answers:</h3>
            {quiz.questions.map((question, index) => (
              <div key={index} className="review-item">
                <p>
                  <strong>Q{index + 1}:</strong> {question.question}
                </p>
                <p
                  className={
                    selectedAnswers[question.id] === question.correctAnswer
                      ? "correct"
                      : "incorrect"
                  }
                >
                  Your answer: {selectedAnswers[question.id]}
                  {selectedAnswers[question.id] !== question.correctAnswer && (
                    <span> (Correct: {question.correctAnswer})</span>
                  )}
                </p>
              </div>
            ))}
          </div>

          <div className="result-actions">
            <button className="retry-btn" onClick={handleRetry}>
              Retry Quiz
            </button>
            <button className="continue-btn" onClick={() => navigate(-1)}>
              Back to Roadmap
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Quizzes;
