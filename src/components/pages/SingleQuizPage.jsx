import React, { useState } from "react";
import { useFormik } from "formik";

function QuizPage() {
  // Example quiz data
  const quizData = {
    title: "Example Quiz",
    category: "History",
    questions: [
      {
        question: "What year did Christopher Columbus discover America?",
        answers: ["1492", "1776", "1865", "1969"],
        correctAnswer: 0,
      },
      {
        question: "Who was the first president of the United States?",
        answers: ["George Washington", "Thomas Jefferson", "John Adams", "Abraham Lincoln"],
        correctAnswer: 0,
      },
      {
        question: "What is the capital of France?",
        answers: ["London", "Paris", "Berlin", "Rome"],
        correctAnswer: 1,
      },
    ],
  };

  const [userAnswers, setUserAnswers] = useState(Array(quizData.questions.length).fill(-1));
  const [error, setError] = useState("");

  const handleAnswerChange = (questionIndex, answerIndex) => {
    const newUserAnswers = [...userAnswers];
    newUserAnswers[questionIndex] = answerIndex;
    if (!newUserAnswers.includes(-1)) {
      setError("");
    }
    setUserAnswers(newUserAnswers);
  };

  const formik = useFormik({
    initialValues: {
      userAnswers: userAnswers,
    },
    onSubmit: () => {
      setError("");
      const hasUnansweredQuestions = userAnswers.includes(-1);
      if (hasUnansweredQuestions) {
        setError("Please answer all questions.");
        return;
      }
      console.log(userAnswers);
      // TODO: Submit user answers to server
    },
  });

  const { handleSubmit } = formik;

  return (
    <div className="mt-20 box-border">
      <h1 className="text-5xl mb-20">{quizData.title}</h1>
      <h2 className="text-2xl mb-10">{quizData.category}</h2>

      <form onSubmit={handleSubmit} className="bg-yellow space-y-4 space-b-10 rounded-lg p-5">
        {quizData.questions.map((q, questionIndex) => (
          <div key={questionIndex} className="space-y-4">
            <div>
              <label htmlFor={`question-${questionIndex}`} className="block text-lg font-medium text-gray-700">
                {q.question}
              </label>
            </div>
            <div className="flex flex-wrap">
              {q.answers.map((a, answerIndex) => (
                <div key={answerIndex} className="w-1/4 pr-2">
                  <label htmlFor={`answer-${questionIndex}-${answerIndex}`} className="block text-md font-medium text-gray-700">
                    {a}
                  </label>
                  <input
                    id={`answer-${questionIndex}-${answerIndex}`}
                    type="radio"
                    name={`answer-${questionIndex}`}
                    value={answerIndex}
                    checked={userAnswers[questionIndex] === answerIndex}
                    onChange={() => handleAnswerChange(questionIndex, answerIndex)}
                    className="mt-1"
                  />
                </div>
              ))}
            </div>
          </div>
        ))}

        {error && <div className="text-red-500">{error}</div>}

        <button type="submit" className="bg-black hover:bg-blue-700 text-white py-2 px-4 rounded">
          Submit Answers
        </button>
      </form>
    </div>
  );
}

export default QuizPage;
