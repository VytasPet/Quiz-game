import React from "react";
import { db } from "../../firebase/firebaseConfig";
import SingleQuizCard from "../quiz/SingleQuizCard";
import { useCollection } from "react-firebase-hooks/firestore";
import { collection, deleteDoc, doc } from "firebase/firestore";
import { useState } from "react";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

function QuizsPage() {
  const quizCollRef = collection(db, "quiz");
  const [value, loading, error] = useCollection(quizCollRef);
  const [arrToShow, setArr] = useState([]);
  const [arrFiltered, setArrFilt] = useState([]);
  const [loadingToast, setloadingToast] = useState(null);

  let arrK = arrToShow;
  useEffect(() => {
    if (loading) {
      setloadingToast(toast.loading("Loading..."));
    } else {
      toast.dismiss(loadingToast);
    }
  }, [loading]);

  useEffect(() => {
    if (value) {
      //console.log("value.docs.data ===", value.docs[0]._document.data.value.mapValue.fields);
      arrK = value.docs;
      arrK = arrK.map((doc) => ({ uid: doc.id, ...doc._document.data.value.mapValue.fields }));
      setArr(arrK);
      setArrFilt(arrK);
    }
  }, [value]);

  // console.log("arrK ===", arrK);

  function filterWord(word) {
    const bum = word.target.innerHTML.toLowerCase();
    // console.log("bum ===", bum);
    if (bum === "show all") {
      // console.log("bum ===", bum);
      setArrFilt(arrToShow);
    } else {
      setArrFilt(arrToShow.filter((quiz) => quiz.category.stringValue === bum));
    }
  }

  //   useEffect(() => {}, [third]);

  //   const shopsWithUid = value && value.docs.map((doc) => ({ uid: doc.id, ...doc.data() }));

  return (
    <>
      <div className=" mt-[35px] px-[30px]">
        <img src="src/assets/images/arrow-leftback.svg" alt="" />
        <h3 className="text-center mb-[30px]">Public quiz</h3>
      </div>
      <div className="flex justify-center">
        <div className="max-w-full bg-lightBlue rounded-[16px] mb-[30px] p-1 flex justify-between">
          <Link to={"/login"} className="px-[45px] text-grey py-[13px] max-w-full rounded-[16px]  z-10">
            Show all
          </Link>
          <Link to={"/register"} className="px-[45px] py-[13px] max-w-full rounded-[16px] bg-blue text-white z-10">
            Geography
          </Link>
          <Link to={"/register"} className="px-[45px] py-[13px] max-w-full rounded-[16px]  text-grey z-10">
            Sports
          </Link>
          <Link to={"/register"} className="px-[45px] py-[13px] max-w-full rounded-[16px]  text-grey z-10">
            History
          </Link>
          <Link to={"/register"} className="px-[45px] py-[13px] max-w-full rounded-[16px]  text-grey z-10">
            Others
          </Link>
        </div>
      </div>
      <div className="flex flex-col items-center">
        <div className="bg-white p-[20px] rounded-[20px] flex gap-5 mt-[25px] w-1/2">
          <img className="bg-lightBlue p-[15px] rounded-[20px]" src="src/assets/images/Group 14cate.svg" alt="" />
          <div className="flex flex-col w-full items-start justify-around">
            <h3 className="text-[15px]">Mathematics XI-2</h3>
            <p className="text-[12px]">Mathematic</p>
            <div className="flex w-full justify-between">
              <h5 className="text-[10px] text-grey">THG89X</h5>
              <p className=" text-[10px] text-grey font-bold pr-[20px]">
                <span>
                  <img className="inline " src="src/assets/images/awardmedalblue.svg" alt="" />
                </span>{" "}
                77.5%
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white p-[20px] rounded-[20px] flex gap-5 mt-[25px] w-1/2">
          <img className="bg-lightBlue p-[15px] rounded-[20px]" src="src/assets/images/Group 14cate.svg" alt="" />
          <div className="flex flex-col w-full items-start justify-around">
            <h3 className="text-[15px]">Mathematics XI-2</h3>
            <p className="text-[12px]">Mathematic </p>
            <div className="flex w-full justify-between">
              <h5 className="text-[10px] text-grey">THG89X</h5>
              <p className=" text-[10px] text-grey font-bold pr-[20px]">
                <span>
                  <img className="inline " src="src/assets/images/awardmedalblue.svg" alt="" />
                </span>{" "}
                77.5%
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default QuizsPage;
