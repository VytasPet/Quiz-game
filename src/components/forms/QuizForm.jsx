import React from "react";
import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useAuthCtx } from "../../store/AuthProvider";

function QuizForm({ addQuiz }) {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("history");
  const [numQuestions, setNumQuestions] = useState("5");
  const { user } = useAuthCtx();

  const initialValues = {
    name: name,
    category: category,
    numQuestions: numQuestions,
    questions: Array.from({ length: 5 }, () => ({
      question: "",
      answers: ["", "", "", ""],
      correctAnswer: -1,
    })),
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Required"),
    category: Yup.string().required("Required"),
    numQuestions: Yup.number().required("Required"),
    questions: Yup.array().of(
      Yup.object().shape({
        question: Yup.string().required("Question is required"),
        answers: Yup.array().of(Yup.string().required("Answer is required")).min(2, "At least two answers are required"),
        correctAnswer: Yup.number().min(0, "Select the correct answer").required("Correct answer is required"),
      })
    ),
  });

  //   const validationSchema = Yup.object().shape({
  //     name: Yup.string().required("Required"),
  //     category: Yup.string().required("Required"),
  //     numQuestions: Yup.number().required("Required"),
  //     questions: Yup.array().of(
  //       Yup.object().shape({
  //         question: Yup.string(),
  //         answers: Yup.array().of(Yup.string()),
  //         correctAnswer: Yup.number().min(0, "Required"),
  //       })
  //     ),
  //   });

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: (values) => {
      const quizObj = { userUid: user.uid, completed: 0, results: 0, ...values };
      addQuiz(quizObj);
      console.log(values);
    },
  });

  const handleNumQuestionsChange = (e) => {
    formik.setFieldValue("numQuestions", e.target.value);
    setNumQuestions(e.target.value);
    formik.setFieldValue(
      "questions",
      Array.from({ length: Number(e.target.value) }, () => ({
        question: "",
        answers: ["", "", "", ""],
        correctAnswer: -1,
      }))
    );
  };

  const handleCorrectAnswerChange = (questionIndex, answerIndex) => {
    formik.setFieldValue(`questions.${questionIndex}.correctAnswer`, answerIndex);
  };

  const handleQuestionChange = (questionIndex, e) => {
    const newQuestions = [...formik.values.questions];
    console.log("newQuestions ===", newQuestions);
    newQuestions[questionIndex].question = e.target.value;
    formik.setFieldValue("questions", newQuestions);
  };

  const handleAnswerChange = (questionIndex, answerIndex, e) => {
    formik.setFieldValue(`questions.${questionIndex}.answers.${answerIndex}`, e.target.value);
  };

  return (
    <form onSubmit={formik.handleSubmit} className="bg-yellow space-y-4 space-b-10 rounded-lg p-5 max-sm:p-2">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
          Name
        </label>
        <input
          id="name"
          name="name"
          value={formik.values.name}
          onChange={formik.handleChange}
          type="text"
          className="mt-1 w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:border-indigo-500 sm:text-sm"
        />

        <label htmlFor="category" className="block text-sm font-medium text-gray-700">
          Category
        </label>
        <select
          id="category"
          value={formik.values.category}
          onChange={formik.handleChange}
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
          {formik.errors.questions?.[questionIndex]?.question && formik.touched.questions?.[questionIndex]?.question && (
            <div className="text-red-500">{formik.errors.questions[questionIndex].question}</div>
          )}

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
                {formik.errors.questions?.[questionIndex]?.answers?.[answerIndex] && formik.touched.questions?.[questionIndex]?.answers?.[answerIndex] && (
                  <div className="text-red-500">{formik.errors.questions[questionIndex].answers[answerIndex]}</div>
                )}

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
  );
}

export default QuizForm;
