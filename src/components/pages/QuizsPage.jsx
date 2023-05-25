import React from "react";
import { db } from "../../firebase/firebaseConfig";
import SingleQuizCard from "../quiz/SingleQuizCard";
import { useCollection } from "react-firebase-hooks/firestore";
import { collection, deleteDoc, doc } from "firebase/firestore";
import { useState } from "react";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

function QuizsPage() {
  const quizCollRef = collection(db, "quiz");
  const [value, loading, error] = useCollection(quizCollRef);
  const [arrToShow, setArr] = useState([]);
  const [arrFiltered, setArrFilt] = useState([]);
  const [loadingToast, setloadingToast] = useState(null);
  const navigate = useNavigate();
  const [areSure, setareSure] = useState(false)

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
      console.log('arrK ===', arrK);
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
    <div className={`${areSure ? "blur-[5px]" : ""}`}>
      <div className=" mt-[35px] px-[30px]">
        <img className="cursor-pointer" onClick={()=>navigate('/userhome')} src="src/assets/images/arrow-leftback.svg" alt="" />
        <h3 className="text-center mb-[30px]">Public quiz</h3>
      </div>
      <div className="flex justify-center">
        <div className="max-w-full bg-lightBlue rounded-[16px] mb-[30px] p-1 flex justify-between max-md:text-[13px]">
          <Link to={"/login"} className="px-[45px] text-grey py-[13px] max-md:px-[20px] max-w-full rounded-[16px] z-10 hover:text-black">
            Show all
          </Link>
          <Link to={"/register"} className="px-[45px] py-[13px] max-w-full rounded-[16px] max-md:px-[20px] bg-blue text-white z-10 hover:text-black">
            Geography
          </Link>
          <Link to={"/register"} className="px-[45px] py-[13px] max-w-full rounded-[16px] max-md:px-[20px] text-grey z-10 hover:text-black">
            Sports
          </Link>
          <Link to={"/register"} className="px-[45px] py-[13px] max-w-full rounded-[16px] max-md:px-[20px] text-grey z-10 hover:text-black">
            History
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
        <div onClick={()=>setareSure(!areSure)} className="bg-white cursor-pointer p-[20px] rounded-[20px] flex gap-5 mt-[25px] w-1/2">
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
      </div>
      {areSure && (
        <div className="statsMid">
          <img src="src/assets/images/Group 13start.svg" alt="" />
          <h2 className="text-black text-[20px] mb-[20px] font-normal">Are you ready to start quiz:</h2>
          <h2 className="text-black text-[20px] mb-[20px] font-normal">Quiz Name</h2>
          <form onSubmit={() => console.log("laba diena")}>
            <button onClick={()=>navigate('/quiz/7Hgonr6p2B6ndU1onqoC')} className="bg-blue p-[6px] cursor-pointer mt-[30px] text-white w-full max-w-[400px] rounded-[20px] flex justify-center hover:text-grey hover:border-white ">
              Start
            </button>
          </form>
          {/* <p className="border-y py-2 w-full">Your ranking: {position}</p>
<p className="border-y py-2 w-full">Created Quiz: {useris.created}</p>
<p className="border-y py-2 w-full">Quiz Completed: {useris.completed}</p>
<p className="border-y py-2 w-full">Average result: {(Number(useris.result) / Number(useris.completed > 1 ? useris.completed : 1)).toFixed(2)}%</p>
*/}

          <div
            onClick={() => setareSure(!areSure)}
            className="bg-white p-[6px] border-2 cursor-pointer border-lightGray mt-[10px] text-black w-full max-w-[400px] rounded-[20px] flex justify-center hover:outline-4 hover:border-blue "
          >
            <p>Back</p>
          </div>
        </div>
      )}
    </>
  );
}

export default QuizsPage;
