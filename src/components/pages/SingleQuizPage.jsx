import React, { useState } from "react";
import { useFormik } from "formik";
import { doc } from "firebase/firestore";
import { db } from "../../firebase/firebase";
import { useDocument } from "react-firebase-hooks/firestore";
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";

function QuizPage() {
  const { quizUid } = useParams();
  const docRef = doc(db, "quiz", quizUid);
  const [value, loading, error] = useDocument(docRef);
  const [afterSub, setafterSub] = useState(false);
  const [quizObj, setQuizObj] = useState(null);
  const [picShop, setPicShop] = useState(null);
  const [showResults, setshowResults] = useState(false);
  const [corAnsArr, setcorAnsArr] = useState([]);
  const [result, setresult] = useState([]);

  useEffect(() => {
    if (value) {
      const obj = value.data();
      const ansArr = obj.questions.map((que) => que.correctAnswer);
      console.log("ansArr ===", ansArr);
      setcorAnsArr(ansArr);
      setQuizObj(obj);
      setUserAnswers(Array(obj.questions.length).fill(-1));
    }
  }, [value]);

  // Example quiz data

  const [userAnswers, setUserAnswers] = useState([]);
  const [erroras, setError] = useState("");

  const handleAnswerChange = (questionIndex, answerIndex) => {
    const newUserAnswers = [...userAnswers];
    newUserAnswers[questionIndex] = answerIndex;
    setUserAnswers(newUserAnswers);
  };

  const compareAnswers = (corArr, userArr) => {
    return corArr.map((correctAnswer, index) => correctAnswer === userArr[index]);
  };

  const countTrueValues = (arr) => {
    return arr.reduce((count, value) => (value ? count + 1 : count), 0);
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
      setafterSub(true);
      setUserAnswers(userAnswers);

      console.log("corAnsArr ===", corAnsArr);
      console.log("userAnswers ===", userAnswers);

      const result = compareAnswers(corAnsArr, userAnswers);
      setresult(result);

      console.log("result ===", result);

      // TODO: Submit user answers to server
    },
  });

  const { handleSubmit } = formik;

  return (
    <>
      {quizObj && (
        <div className="mt-20 box-border ">
          <h1 className="text-5xl mb-20">{quizObj.name}</h1>
          <h2 className="text-2xl mb-10">{quizObj.category}</h2>
          <div className="border p-5 bg-black rounded-lg">
            <form onSubmit={handleSubmit} className="bg-yellow space-y-4 space-b-10 rounded-lg p-5">
              {quizObj.questions.map((q, questionIndex) => (
                <div key={questionIndex} className="space-y-4">
                  <div>
                    <label htmlFor={`question-${questionIndex}`} className="block text-lg font-medium text-gray-700">
                      {q.question}
                    </label>
                    {afterSub && corAnsArr[questionIndex] === userAnswers[questionIndex] && <p className="text-green">correct!</p>}
                    {afterSub && corAnsArr[questionIndex] !== userAnswers[questionIndex] && <p className="text-red">Wrong!</p>}
                  </div>
                  <div className="flex flex-wrap">
                    {q.answers.map((a, answerIndex) => (
                      <div key={answerIndex} className={`w-1/4 pr-2`}>
                        <label
                          htmlFor={`answer-${questionIndex}-${answerIndex}`}
                          className={`block text-md font-medium border w-full rounded-lg text-gray ${afterSub && corAnsArr[questionIndex] === answerIndex ? "bg-green" : ""}`}
                        >
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
                          disabled={afterSub}
                        />
                      </div>
                    ))}
                  </div>
                  {userAnswers[questionIndex] === -1 && erroras && <div className="text-red-500">Please answer this question.</div>}
                </div>
              ))}

              {/* {erroras && <div className="text-red-500">Must answer all questions!</div>} */}

              {afterSub && (
                <div className="border bg-black text-white rounded-lg">
                  <p>
                    Your answered correct: {countTrueValues(result)} / {result.length}
                  </p>
                  <p>----</p>
                  <p>{(countTrueValues(result) / result.length) * 100}%</p>
                </div>
              )}
              {!afterSub && (
                <button type="submit" className="bg-black hover:bg-blue-700 text-white py-2 px-4 rounded">
                  Submit Answers
                </button>
              )}
              {afterSub && (
                <button type="submit" className="bg-white text-black hover:bg-grey hover:text-white py-2 px-4 rounded">
                  Back to Quiz List
                </button>
              )}
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default QuizPage;
