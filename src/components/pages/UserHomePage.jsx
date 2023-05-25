import React from "react";
import { db } from "../../firebase/firebaseConfig";
import SingleQuizCard from "../quiz/SingleQuizCard";
import { useCollection } from "react-firebase-hooks/firestore";
import { collection, deleteDoc, doc } from "firebase/firestore";
import { useState } from "react";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

function UserHomePage() {
  const quizCollRef = collection(db, "quiz");
  const [value, loading, error] = useCollection(quizCollRef);
  const [arrToShow, setArr] = useState([]);
  const [arrFiltered, setArrFilt] = useState([]);
  const [loadingToast, setloadingToast] = useState(null);
  const navigate = useNavigate();

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
    <div className="mx-auto box-border mt-5 max-sm:mt-10 bg-profileBack">
        
        <div className="flex justify-center mr-10">
        <div className="bg-white p-[12px]  mb-[20px] max-w-[300px] rounded-[20px] flex ">
          <div className="flex flex-row items-center">
            <img className="inline p-[8px] mr-[5px]  rounded-[16px]" src="src/assets/images/hello.svg" alt="" />
            <p className="text-grey">
              Hello, <span className="text-black font-bold">username</span>
            </p>
          </div>
        </div>
        </div>
      
<div className="flex items-center justify-center">
      <div className="bg-blue p-[25px] text-white rounded-[20px] mt-[30px] mb-[35px] max-w-[500px] flex flex-col ">
        <h3 className="text-left mb-[15px]">Find Quiz Code</h3>
        <p className="text-[16px] font-light text-left">Enter quiz code that given by teacher, and you can start gathering points!</p>
        <div className="flex items-center justify-center mt-[30px]">
        <div className="relative w-1/2">
          <img src="src/assets/images/searchsearch.svg" alt="" className="absolute left-4 top-[50%] transform -translate-y-1/2" />
          <input
            id="search"
            name="search"
            // onChange={formik.handleChange}
            // onBlur={formik.handleBlur}
            // value={formik.values.username}
            placeholder="Search quiz code"
            type="text"
            className="mt-1 pl-[50px] w-full py-4 px-3 text-[14px] text-black bg-lightGray rounded-[20px] shadow-sm focus:outline-none sm:text-sm"
          />
        </div>
        </div>
        </div>
      </div>
    <div className="flex items-center justify-between mt-[35px] px-[30px]">
      <h3 className="text-left">Public quiz</h3>
      <img className="cursor-pointer" onClick={()=>navigate('/quiz')} src="src/assets/images/arrow-leftarrow.svg" alt="" />
    </div>
    
{/* Public quiz list */}
<div className="flex flex-col items-center">
    <div className="bg-white p-[20px] rounded-[20px] flex gap-5 mt-[25px] w-1/2">
    <img className="bg-lightBlue p-[15px] rounded-[20px]" src="src/assets/images/Group 14cate.svg" alt="" />
    <div className="flex flex-col w-full items-start justify-around">
        <h3 className="text-[15px]">Mathematics XI-2</h3>
        <p className="text-[12px]">Mathematic</p>
        <div className="flex w-full justify-between">
        <h5 className="text-[10px] text-grey">THG89X</h5>
        <p className=" text-[10px] text-grey font-bold pr-[20px]"><span><img className="inline " src="src/assets/images/awardmedalblue.svg" alt="" /></span> 77.5%</p>
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
        <p className=" text-[10px] text-grey font-bold pr-[20px]"><span><img className="inline " src="src/assets/images/awardmedalblue.svg" alt="" /></span> 77.5%</p>
        </div>
    </div>
    </div>
</div>
</div>


  );
}

export default UserHomePage;
