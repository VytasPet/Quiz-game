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

  const { handleSubmit, resetForm } = formik;

  return (
    <>
      {quizObj && (
        <div className="box-border  max-sm:mt-10">
          <div className=" text-white bg-blue font-light pt-[20px] flex flex-col items-center">
            <p className=" text-white mb-[30px]">{quizObj.name}</p>

            <div className="bg-white p-[12px] mb-[40px] w-fit rounded-[20px] flex ">
              <div className="flex flex-row">
                <h4 className="text-xl text-grey max-sm:mb-10">{quizObj.name}</h4>
              </div>
            </div>

            <h2 className="text-[15px] font-light text-grey mb-10">1/20</h2>
            {/* <h2 className="text-2xl font-light text-grey mb-10">{quizObj.category}</h2> */}
          </div>

          <div></div>
          {/* Single question answers */}
          <div className="border p-5 bg-profileBack rounded-[20px] flex flex-col items-center ">
            <div className="bg-white p-[12px] w-2/3 mb-[20px] rounded-[20px] flex ">
              <div className="flex flex-row">
                <h4 className="text-xl text-grey max-sm:mb-10">1. Klausimas. Kas as esu? {quizObj.name}</h4>
              </div>
            </div>
            <div className="bg-white p-[12px] w-2/3 mb-[20px] rounded-[20px] flex ">
              <div className="flex flex-row">
                <h4 className="text-xl text-grey max-sm:mb-10">2. Klausimas. Kas tu esi? {quizObj.name}</h4>
              </div>
            </div>
            <div className="bg-white p-[12px] w-2/3 mb-[20px] rounded-[20px] flex ">
              <div className="flex flex-row">
                <h4 className="text-xl text-grey max-sm:mb-10">3. Klausimas. Kas jie ra? {quizObj.name}</h4>
              </div>
            </div>
            <div className="bg-white p-[12px] w-2/3 mb-[20px] rounded-[20px] flex ">
              <div className="flex flex-row">
                <h4 className="text-xl text-grey max-sm:mb-10">4. Klausimas. Kas mes esam? {quizObj.name}</h4>
              </div>
            </div>
          </div>
          <div className="flex justify-end">
            <button className="px-[45px] py-[13px] mr-[30px] max-w-full rounded-[16px] bg-blue text-white z-10">NEXT</button>
          </div>

          <div>
            {/* Finish quiz */}
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
          </div>

          <div className="border p-5 bg-profileBack rounded-lg max-sm:p-2">
            <form onSubmit={handleSubmit} className="bg-yellow space-y-4 space-b-10 rounded-lg p-5 max-sm:p-1 max-sm:space-y-3 max-sm:">
              {quizObj.questions.map(
                (q, questionIndex) =>
                  questionIndex === currentQuestion && (
                    <div key={questionIndex} className="space-y-4 bg-blue">
                      <div className="flex flex-col items-center">
                        <div className=" text-white bg-blue font-light pt-[20px] flex flex-col items-center">
                          <p className=" text-white mb-[30px]">{quizObj.name}</p>
                          {/* <h2 className="text-2xl font-light text-grey mb-10">{quizObj.category}</h2> */}
                        </div>
                        <div className="bg-white p-[12px] mb-[40px] w-fit rounded-[20px] flex ">
                          <div className="flex  justify-center">
                            <label htmlFor={`question-${questionIndex}`} className="block text-lg font-medium text-gray-700">
                            {q.question}
                            </label>
                          </div>
                        </div>

                        {afterSub && corAnsArr[questionIndex] === userAnswers[questionIndex] && <p className="text-green">correct!</p>}
                        {afterSub && corAnsArr[questionIndex] !== userAnswers[questionIndex] && <p className="text-red">Wrong!</p>}
                      </div>
                      <div className="border p-5 bg-profileBack rounded-[20px] flex flex-col items-center justify-center">
                        {q.answers.map((a, answerIndex) => (
                          <div key={answerIndex} className={` pr-1 bg-white p-[12px] w-2/3 mb-[20px] rounded-[20px] flex `}>
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
                            />
                          </div>
                        ))}
                      </div>
                      {userAnswers[questionIndex] === -1 && erroras && <div className="text-red-500">Please answer this question.</div>}
                    </div>
                  )
              )}
              {currentQuestion < quizObj.questions.length - 1 && (
                <button onClick={() => setCurrentQuestion(currentQuestion + 1)} className="bg-black hover:bg-blue-700 text-white py-2 px-4 rounded">
                  Next
                </button>
              )}
              {currentQuestion === quizObj.questions.length - 1 && !afterSub && (
                <button type="submit" className="bg-black hover:bg-blue-700 text-white py-2 px-4 rounded">
                  Submit Answers
                </button>
              )}

              {/* {erroras && <div className="text-red-500">Must answer all questions!</div>} */}
            </form>
            {/* <button onClick={addComplete}>add</button> */}
          </div>
        </div>
      )}
    </>
  );
}

export default QuizPage;
