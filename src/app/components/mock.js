"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const getQuestions = async () => {
  const res = await fetch(process.env.NEXT_PUBLIC_API_URL2);
  const data = await res.json();
  return data.result;
};

export default function Mock({ prop }) {
  const quiz = prop;
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [totalTimeLeft, setTotalTimeLeft] = useState(1800);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [result, setResult] = useState({ correct: 0, wrong: 0 });
  const timerRef = useRef(null);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  };

  const handleSubmit = () => {
    if (isSubmitted) return;

    clearInterval(timerRef.current); //  Stop timer immediately
    let correct = 0;
    let wrong = 0;

    questions.forEach((q) => {
      const selected = selectedOptions[q._id];
      const correctAnswerText = q[q.correct?.toLowerCase()];

      if (selected === undefined) return;

      if (selected === correctAnswerText) {
        correct++;
      } else {
        wrong++;
      }
    });

    setResult({ correct, wrong });
    setIsSubmitted(true);
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = await getQuestions();
      const filtered = data.filter(
        (q) => q.test?.toLowerCase() === quiz?.toLowerCase()
      );
      setQuestions(filtered);
    };

    fetchData();
  }, [quiz]);

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setTotalTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          alert("Time's up!");
          handleSubmit(); // Auto-submit on time up
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timerRef.current); // Cleanup on unmount
  }, []);

  const handleOptionChange = (questionId, option) => {
    if (totalTimeLeft <= 0) return;
    setSelectedOptions((prev) => ({
      ...prev,
      [questionId]: option,
    }));
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion((prev) => prev - 1);
    }
  };

  const handleSaveAndNext = () => {
    console.log(
      "Saved answer:",
      selectedOptions[questions[currentQuestion]._id]
    );
    handleNext();
  };

  if (!questions.length) {
    return (
      <div className="p-6 text-center">
        {quiz ? (
          <p>
            Loading Questions for <strong>{quiz}</strong>.
          </p>
        ) : (
          <p>Loading questions...</p>
        )}
      </div>
    );
  }

  const q = questions[currentQuestion];
  const options = [q.a, q.b, q.c, q.d].filter(Boolean);

  const total = result.correct + result.wrong;
  const accuracy = total > 0 ? (result.correct / total) * 100 : 0;

  if (isSubmitted) {
    return (
      <div className="p-6 max-w-sm mx-auto bg-white rounded-lg shadow-md text-center">
        <h1 className="text-2xl font-bold text-green-700 mb-6">
          Quiz Submitted!
        </h1>

        <div className="mb-6 flex justify-center">
          <div style={{ width: 120, height: 120 }}>
            <CircularProgressbar
              value={accuracy}
              text={`${Math.round(accuracy)}%`}
              styles={buildStyles({
                textColor: "#16a34a",
                pathColor: "#16a34a",
                trailColor: "#d1fae5",
                textSize: "16px",
              })}
            />
          </div>
        </div>

        <div className="mb-2 font-semibold text-gray-700">
          Correct: {result.correct} | Wrong: {result.wrong}
        </div>

        <p className="text-gray-600 mt-4">Thank you for participating!</p>
        <Link className="text-[12px] text-blue-600" href="/mockarea/mockpage">
          go to quiz page
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center p-6 md:w-[70%] mx-auto">
      <div className="max-w-xl w-full bg-white rounded-xl p-6 space-y-6 shadow">
        <div className="flex justify-between text-sm text-gray-500">
          <div>
            Question {currentQuestion + 1} of {questions.length}
          </div>
          <div className="font-bold text-red-600">
            Time left: {formatTime(totalTimeLeft)}
          </div>
        </div>

        <h2 className="text-lg sm:text-xl font-semibold text-gray-800">
          {q.name}
        </h2>

        <div className="space-y-4">
          {options.map((option, idx) => (
            <label
              key={idx}
              className={`flex items-center p-3 border rounded-lg cursor-pointer transition hover:shadow-md ${
                selectedOptions[q._id] === option
                  ? "border-green-500 bg-green-50"
                  : "border-gray-300"
              }`}
            >
              <input
                type="radio"
                name={`quiz-option-${q._id}`}
                value={option}
                checked={selectedOptions[q._id] === option}
                onChange={() => handleOptionChange(q._id, option)}
                className="mr-4 h-5 w-5 text-green-600"
                disabled={totalTimeLeft <= 0}
              />
              <span className="text-gray-700">{option}</span>
            </label>
          ))}
        </div>

        <div className="flex justify-between pt-6 flex-wrap gap-2">
          <button
            onClick={handlePrevious}
            disabled={currentQuestion === 0 || totalTimeLeft <= 0}
            className="px-4 py-2 bg-gray-300 text-black rounded hover:bg-gray-400 disabled:opacity-50"
          >
            Previous
          </button>

          <button
            onClick={handleSaveAndNext}
            disabled={totalTimeLeft <= 0}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
          >
            Save & Next
          </button>

          <button
            onClick={handleNext}
            disabled={
              currentQuestion === questions.length - 1 || totalTimeLeft <= 0
            }
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50"
          >
            Next
          </button>

          <button
            onClick={handleSubmit}
            disabled={isSubmitted || totalTimeLeft <= 0}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 disabled:opacity-50"
          >
            Submit Quiz
          </button>
        </div>
      </div>
    </div>
  );
}
