import React from "react";
import { db } from "../../firebase/firebase";
import SingleQuizCard from "../quiz/SingleQuizCard";
import { useCollection } from "react-firebase-hooks/firestore";
import { collection, deleteDoc, doc } from "firebase/firestore";
import { useState } from "react";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { useAuthCtx } from "../../store/AuthProvider";
import { Link } from "react-router-dom";

function QuizsPage() {
  const quizCollRef = collection(db, "quiz");
  const [value, loading, error] = useCollection(quizCollRef);
  const [arrToShow, setArr] = useState([]);
  const [arrFiltered, setArrFilt] = useState([]);
  const [loadingToast, setloadingToast] = useState(null);
  const { user } = useAuthCtx();

  useEffect(() => {
    if (loading) {
      setloadingToast(toast.loading("Loading..."));
    } else {
      toast.dismiss(loadingToast);
    }
  }, [loading]);

  useEffect(() => {
    let arrK;
    if (value) {
      //console.log("value.docs.data ===", value.docs[0]._document.data.value.mapValue.fields);
      arrK = value.docs;
      console.log("arrK ===", arrK);
      arrK = arrK.map((doc) => ({ uid: doc.id, ...doc._document.data.value.mapValue.fields }));
      console.log("userio ===", user.uid);
      const myQuiz = arrK.filter((quiz) => quiz.userUid.stringValue === user.uid);
      console.log("myQuiz ===", myQuiz);
      setArr(myQuiz);
      setArrFilt(myQuiz);
    }
  }, [value]);

  function filterWord(word) {
    const bum = word.target.innerHTML.toLowerCase();
    console.log("bum ===", bum);
    if (bum === "show all") {
      console.log("bum ===", bum);
      setArrFilt(arrToShow);
    } else {
      setArrFilt(arrToShow.filter((quiz) => quiz.category.stringValue === bum));
    }
  }

  //   const shopsWithUid = value && value.docs.map((doc) => ({ uid: doc.id, ...doc.data() }));

  return (
    <div className="mt-20 box-border">
      <h1 className="text-5xl mb-20">Active Quiz List</h1>
      <div className="text-left fixed">
        <h2 className="text-2xl mb-3">Filters:</h2>
        <div className="flex flex-col items-start">
          <button onClick={filterWord} className="border p-3 mb-1 rounded-full inline hover:bg-yellow">
            Show all
          </button>
          <button onClick={filterWord} className="border p-3 mb-1 rounded-full inline hover:bg-yellow">
            Sports
          </button>
          <Link onClick={filterWord} className="border p-3 mb-1 rounded-full inline hover:bg-yellow">
            Geography
          </Link>
          <Link onClick={filterWord} className="border p-3 mb-1 rounded-full inline hover:bg-yellow">
            History
          </Link>
        </div>
      </div>
      {value && arrFiltered.map((quiz) => <SingleQuizCard key={quiz.uid} item={quiz} />)}
    </div>
  );
}

export default QuizsPage;
