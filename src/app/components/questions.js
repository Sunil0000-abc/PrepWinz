"use client";

import { useEffect, useState } from "react";

const getQuestions = async () => {
  const res = await fetch("http://localhost:3000/products");
  const data = await res.json();
  return data.result;
};

export default function QuestionPage({ prop }) {
  const company = prop;
  const [questions, setQuestions] = useState([]);
  const [showCorrect, setShowCorrect] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const data = await getQuestions();
      const filtered = data.filter(
        (q) => q.company?.toLowerCase() === company?.toLowerCase()
      );
      setQuestions(filtered);
    };

    fetchData();
  }, [company]);

  useEffect(() => {
    setShowCorrect(false); // Hide correct answer when moving to a new question
  }, [currentQuestion]);

  const handleOptionChange = (questionId, option) => {
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

  const handleCheckCorrect = () => {
    setShowCorrect(true);
  };

  if (!questions.length) {
    return (
      <div className="p-6 text-center">
        {company ? (
          <p>
            Loading questions for ...<strong>{company}</strong>.
          </p>
        ) : (
          <p>Loading questions...</p>
        )}
      </div>
    );
  }

  const q = questions[currentQuestion];
  const options = [q.one, q.two, q.three, q.four].filter(Boolean);

  return (
    <div className="flex flex-col items-center p-6 md:w-[70%] mx-auto">
      <div className="max-w-xl w-full bg-white rounded-xl p-6 space-y-6 shadow">
        <div className="flex justify-between text-sm text-gray-500">
          <div>
            Question {currentQuestion + 1} of {questions.length}
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
              />
              <span className="text-gray-700">{option}</span>
            </label>
          ))}
        </div>

        <div className="flex justify-between pt-6">
          <button
            onClick={handlePrevious}
            disabled={currentQuestion === 0}
            className="px-4 py-2 bg-gray-300 text-black rounded hover:bg-gray-400 disabled:opacity-50"
          >
            Previous
          </button>

          <button
            onClick={handleSaveAndNext}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Save & Next
          </button>

          <button
            onClick={handleNext}
            disabled={currentQuestion === questions.length - 1}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50"
          >
            Next
          </button>
          <button
            onClick={handleCheckCorrect}
            className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
          >
            Correct
          </button>
        </div>
        {showCorrect && (
          <div className="mt-4 p-4 bg-green-50 border-l-4 border-green-500 text-green-700 rounded">
            ✅ Correct answer: <strong>{q.correct}</strong>
          </div>
        )}
      </div>
    </div>
  );
}
