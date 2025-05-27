"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const getQuestions = async () => {
  const res = await fetch("http://localhost:3000/mocktest");
  const data = await res.json();
  return data.result;
};

export default function Mock({ prop }) {
  const quiz = prop;
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [totalTimeLeft, setTotalTimeLeft] = useState(100); // 30 minutes
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [result, setResult] = useState({ correct: 0, wrong: 0 });

  // Format time as MM:SS
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  };

  const handleSubmit = () => {
    let correct = 0;
    let wrong = 0;

    questions.forEach((q) => {
      if (selectedOptions[q._id] === q.answer) {
        correct++;
      } else {
        wrong++;
      }
    });

    setResult({ correct, wrong });
    setIsSubmitted(true);
  };

  // Fetch questions
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

  // Global 30-minute countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      setTotalTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          alert("Time's up!");
          handleSubmit(); // ✅ Auto-submit on time up
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleOptionChange = (questionId, option) => {
    if (totalTimeLeft <= 0) return; // prevent selection after time
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
            Loading Questions for ... <strong>{quiz}</strong>.
          </p>
        ) : (
          <p>Loading questions...</p>
        )}
      </div>
    );
  }

  const q = questions[currentQuestion];
  const options = [q.a, q.b, q.c, q.d].filter(Boolean);

 if (isSubmitted) {
  return (
   <div className="p-6 max-w-sm mx-auto bg-white rounded-lg shadow-md text-center">
  <h1 className="text-2xl font-bold text-green-700 mb-6">Quiz Submitted!</h1>
  
  <div className="mb-6">
    <div className="mb-2 font-semibold text-gray-700">Correct Answers: {result.correct}</div>
    <div className="bg-green-200 rounded h-6 relative">
      <div 
        className="bg-green-600 h-6 rounded" 
        style={{ width: `${(result.correct / (result.correct + result.wrong)) * 100}%` }} 
      />
    </div>
  </div>
  
  <div className="mb-6">
    <div className="mb-2 font-semibold text-gray-700">Wrong Answers: {result.wrong}</div>
    <div className="bg-red-200 rounded h-6 relative">
      <div 
        className="bg-red-600 h-6 rounded" 
        style={{ width: `${(result.wrong / (result.correct + result.wrong)) * 100}%` }} 
      />
    </div>
  </div>

  <p className="text-gray-600 mt-4">Thank you for participating!</p>
  <Link className="text-[12px] text-blue-600" href='/mockarea/mockpage'>go to quiz page</Link>
</div>


  );
} else {
  return (
    <div className="flex flex-col items-center p-6 md:w-[70%] mx-auto">
      <div className="max-w-xl w-full bg-white rounded-xl p-6 space-y-6 shadow">
        <div className="flex justify-between text-sm text-gray-500">
          <div>Question {currentQuestion + 1} of {questions.length}</div>
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
            disabled={currentQuestion === questions.length - 1 || totalTimeLeft <= 0}
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

}
