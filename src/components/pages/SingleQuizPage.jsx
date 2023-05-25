import React, { useState } from "react";
import { useFormik } from "formik";
import { db } from "../../firebase/firebaseConfig";
import { useDocument } from "react-firebase-hooks/firestore";
import { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useAuthCtx } from "../../store/AuthProvider";
import { query, where, getDocs } from "firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore";
import { addDoc, collection, doc, updateDoc } from "firebase/firestore";
import finisas from "/src/assets/images/finito.svg";

function QuizPage() {
  const navigate = useNavigate();
  const { quizUid } = useParams();
  const docRef = doc(db, "quiz", quizUid);
  const [value, loading, error] = useDocument(docRef);
  const [afterSub, setafterSub] = useState(false);
  const [quizObj, setQuizObj] = useState(null);
  const [picShop, setPicShop] = useState(null);
  const [showResults, setshowResults] = useState(false);
  const [corAnsArr, setcorAnsArr] = useState([]);
  const [result, setresult] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [currentResultQuestion, setCurrentResultQuestion] = useState(0);
  const [toWatchResults, settoWatchResults] = useState([]);

  useEffect(() => {
    resetForm();
  }, [currentQuestion]);

  const { user } = useAuthCtx();

  const quizCollRef = collection(db, "users");
  const q = query(quizCollRef, where("userUid", "==", user.uid));
  const [values, loadings, errors] = useCollection(q);

  const docRefas = doc(db, "quiz", quizUid);
  const [valueQ, loadingQ, errorQ] = useDocument(docRefas);

  const [userDocId, setUserDocId] = useState(null);

  useEffect(() => {
    if (values) {
      const userDoc = values.docs.find((doc) => doc.data().userUid === user.uid);
      if (userDoc) {
        // console.log("User document ID:", userDoc.id);
        setUserDocId(userDoc.id);
      } else {
        // console.log("User document not found.");
      }
    }
  }, [values, user]);

  useEffect(() => {
    if (value) {
      const obj = value.data();
      const ansArr = obj.questions.map((que) => que.correctAnswer);
      setcorAnsArr(ansArr);
      setQuizObj(obj);
      setUserAnswers(Array(obj.questions.length).fill(-1)); // Initialize userAnswers here
    }
  }, [value]);

  function addComplete() {
    let viskas = values.docs[0].data();
    let numer = Number(viskas.completed) + 1;

    const docRef = doc(db, "users", userDocId);
    updateDoc(docRef, { completed: numer });
  }

  useEffect(() => {
    if (value) {
      const obj = value.data();
      const ansArr = obj.questions.map((que) => que.correctAnswer);
      // console.log("ansArr ===", ansArr);
      setcorAnsArr(ansArr);
      setQuizObj(obj);
      //   setUserAnswers(Array(obj.questions.length).fill(-1));
    }
  }, [value]);

  // Example quiz data

  const [userAnswers, setUserAnswers] = useState([]);
  const [erroras, setError] = useState("");

  const handleAnswerChange = (questionIndex, answerIndex) => {
    console.log("handleAnswerChange ===", "paspaudem mygtuka");
    const newUserAnswers = [...userAnswers];
    newUserAnswers[questionIndex] = answerIndex;
    console.log("newUserAnswers ===", newUserAnswers);
    setUserAnswers(newUserAnswers);
    console.log("userAnswers ===", userAnswers);
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

      // console.log("corAnsArr ===", corAnsArr);
      // console.log("userAnswers ===", userAnswers);

      const resultat = compareAnswers(corAnsArr, userAnswers);
      // console.log("resultat ===", resultat);
      setresult(resultat);
      addComplete();

      let viskas = values.docs[0].data();
      const newScore = Number(viskas.result) + (countTrueValues(resultat) / userAnswers.length) * 100;
      const docRef = doc(db, "users", userDocId);
      updateDoc(docRef, { result: newScore });
      // console.log("result ===", resultat);

      //quizui update
      let visiskas = valueQ.data();
      // console.log("visiskas ===", visiskas);
      let numer = Number(visiskas.completed) + 1;
      // console.log("resultat ===", resultat);
      let numerRez = Number(visiskas.results) + (countTrueValues(resultat) / userAnswers.length) * 100;

      const docRefQuiz = doc(db, "quiz", quizUid);
      updateDoc(docRefQuiz, { completed: numer });
      updateDoc(docRefQuiz, { results: numerRez });

      // TODO: Submit user answers to server
    },
  });

  useEffect(() => {
    console.log("userAnswers ===", userAnswers);
    console.log("toWatchResults ===", toWatchResults);
  }, [userAnswers]);

  const { handleSubmit, resetForm } = formik;

  return (
    <>
      {quizObj && (
        <div className="box-border  max-sm:mt-10">
          <div>
            {/* Finish quiz */}
            {afterSub && (
              <div className="border p-5 bg-profileBack rounded-[20px] flex flex-col items-center ">
                <img src="src/assets/images/finito.svg" alt="" />
                <div className="bg-white p-[12px] w-2/3 mb-[20px] rounded-[20px] flex items-center justify-center ">
                  <div className="flex flex-col ">
                    <img src={finisas} alt="" />
                    <h4 className="text-xl mb-[10px] text-grey">Congrats!</h4>
                    <p className="font-light">
                      Your results of <span className="font-bold">{quizObj.name}</span> quiz:
                    </p>
                    <p className="font-bold">{(countTrueValues(result) / result.length) * 100}%</p>
                    <div className="flex flex-col gap-[20px] justify-center mt-[20px]">
                      <button className="px-[45px] py-[13px] max-w-full rounded-[16px] bg-blue text-white z-10">See Results</button>
                      <Link to={"/quiz"} className="px-[45px] py-[13px] max-w-full rounded-[16px] border-2 border-grey bg-white text-grey z-10">
                        Back to Quiz page
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
          {!afterSub && (
            <form onSubmit={handleSubmit} className="pb-[30px] bg-blue rounded-lg max-sm:p-1 max-sm:space-y-3 max-sm:">
              {quizObj.questions.map(
                (q, questionIndex) =>
                  questionIndex === currentQuestion && (
                    <div key={questionIndex} className=" flex w-full flex-col justify-center items-center">
                      <div className="bg-blue">
                        <div className="flex flex-col items-center">
                          <div className=" text-white bg-blue font-light pt-[20px] flex flex-col items-center">
                            <p className=" text-white mb-[30px]">{quizObj.name}</p>
                            {/* <h2 className="text-2xl font-light text-grey mb-10">{quizObj.category}</h2> */}
                          </div>
                          <div className="bg-white p-[12px] mb-[40px] rounded-[20px] ">
                            <div className="flex justify-center">
                              <label htmlFor={`question-${questionIndex}`} className="block text-lg font-normal text-gray-700">
                                {q.question}
                              </label>
                            </div>
                          </div>
                        </div>
                        {afterSub && corAnsArr[questionIndex] === userAnswers[questionIndex] && <p className="text-green">correct!</p>}
                        {afterSub && corAnsArr[questionIndex] !== userAnswers[questionIndex] && <p className="text-red">Wrong!</p>}
                      </div>
                      <div className="bg-blue flex justify-center w-full">
                        <div className=" p-5 bg-profileBack rounded-[20px] mx-[20px] w-[700px] flex flex-col items-center">
                          {q.answers.map((a, answerIndex) => (
                            <div
                              key={answerIndex}
                              onClick={() => !afterSub && handleAnswerChange(questionIndex, answerIndex)}
                              className={`cursor-pointer pr-1 p-[12px] w-2/3 mb-[20px] rounded-[20px] flex bg-white ${userAnswers[questionIndex] === answerIndex ? "outline outline-grey" : ""}`}
                            >
                              <label
                                htmlFor={`answer-${questionIndex}-${answerIndex}`}
                                className={`block text-md font-medium w-full rounded-lg text-gray max-sm:text-xs max-sm:text-center ${
                                  afterSub && corAnsArr[questionIndex] === answerIndex ? "bg-green" : ""
                                }`}
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
                                className="mt-1 p-5"
                                disabled={afterSub}
                                style={{ display: "none" }} // hide the radio button
                              />
                            </div>
                          ))}
                          {userAnswers[questionIndex] === -1 && erroras && <div className="bg-profileBack text-red-500 m-0">Please answer this question.</div>}
                        </div>
                      </div>
                    </div>
                  )
              )}
              {currentQuestion < quizObj.questions.length - 1 && (
                <button
                  onClick={() => setCurrentQuestion(currentQuestion + 1)}
                  className="px-[45px] py-[13px] max-w-full rounded-[16px] bg-profileBack text-blue mt-[30px] outline  hover:outline-white z-10"
                  disabled={userAnswers[currentQuestion] === -1}
                >
                  Next
                </button>
              )}
              {currentQuestion === quizObj.questions.length - 1 && !afterSub && (
                <div className="flex justify-center">
                  <button
                    type="submit"
                    onClick={() => settoWatchResults(userAnswers)}
                    className="px-[45px] py-[13px] max-w-full rounded-[16px] bg-profileBack text-blue mt-[30px] outline hover:outline-grey z-10"
                  >
                    Submit Answers
                  </button>
                </div>
              )}

              {/* {erroras && <div className="text-red-500">Must answer all questions!</div>} */}
            </form>
          )}
          {/* <button onClick={addComplete}>add</button> */}
        </div>
      )}
    </>
  );
}

export default QuizPage;
