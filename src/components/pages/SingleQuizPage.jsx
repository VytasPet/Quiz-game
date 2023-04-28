import React from "react";
import QuizForm from "../forms/QuizForm";

function SingleQuizPage() {
  return (
    <div className="mt-20 box-border">
      <h1 className="text-5xl mb-20">2023 NBA season statistics</h1>

      <div className="flex flex-col items-center">
        <div className="flex flex-col items-center px-4 pt-2 pb-5 w-full mb-10 bg-black text-white rounded-lg">
          <div className="font-cursive text-black pt-6 pb-3 px-5"></div>
          <form onSubmit={formik.handleSubmit} className="bg-yellow space-y-4 space-b-10 rounded-lg p-5">
            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                Category
              </label>
              <select
                id="category"
                value={category}
                onChange={handleCategoryChange}
                className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              >
                <option value="history">History</option>
                <option value="sports">Sports</option>
                <option value="geography">Geography</option>
              </select>
            </div>

            <div>
              <label htmlFor="num_questions" className="block text-sm font-medium text-gray-700">
                Number of Questions
              </label>
              <select
                id="num_questions"
                value={numQuestions}
                onChange={handleNumQuestionsChange}
                className="mt-1 block w-full py-2 px-3 border border-black bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              >
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="15">15</option>
                <option value="20">20</option>
              </select>
            </div>

            {formik.values.questions.map((q, questionIndex) => (
              <div key={questionIndex} className="space-y-4">
                <label htmlFor={`question-${questionIndex}`} className="block text-sm font-medium text-gray-700">
                  Question {questionIndex + 1}
                </label>
                <input
                  id={`question-${questionIndex}`}
                  value={q.question}
                  onChange={(e) => handleQuestionChange(questionIndex, e)}
                  type="text"
                  className="mt-1 w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:border-indigo-500 sm:text-sm"
                />

                <div className="flex flex-wrap">
                  {q.answers.map((a, answerIndex) => (
                    <div key={answerIndex} className="w-1/4 pr-2">
                      <label htmlFor={`answer-${questionIndex}-${answerIndex}`} className="block text-sm font-medium text-gray-700">
                        Answer {answerIndex + 1}
                      </label>
                      <input
                        id={`answer-${questionIndex}-${answerIndex}`}
                        value={a}
                        onChange={(e) => handleAnswerChange(questionIndex, answerIndex, e)}
                        type="text"
                        className="mt-1 w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:border-black sm:text-sm"
                      />
                      <input
                        type="radio"
                        id={`correctAnswer-${questionIndex}-${answerIndex}`}
                        name={`questions.${questionIndex}.correctAnswer`}
                        value={answerIndex}
                        checked={q.correctAnswer === answerIndex}
                        onChange={() => handleCorrectAnswerChange(questionIndex, answerIndex)}
                        className="mt-1"
                      />
                      <label htmlFor={`correctAnswer-${questionIndex}-${answerIndex}`} className="block text-sm font-medium">
                        Correct
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            ))}

            <button type="submit" className="bg-black mt-10 text-white py-2 px-4 rounded hover:bg-background hover:text-black hover:outline ">
              Create Quiz
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
export default SingleQuizPage;
