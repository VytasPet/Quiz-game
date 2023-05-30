import React from "react";
import { db } from "../../firebase/firebaseConfig";
import SingleQuizCard from "../quiz/SingleQuizCard";
import { useCollection } from "react-firebase-hooks/firestore";
import { collection, deleteDoc, doc } from "firebase/firestore";
import { useState } from "react";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { useAuthCtx } from "../../store/AuthProvider";

function UserHomePage() {
  const { user, isLoggedIn } = useAuthCtx();
  const quizCollRef = collection(db, "quiz");
  const usersCollRef = collection(db, "users");
  const [value, loading, error] = useCollection(quizCollRef);
  const [valueInfo, loadingInfo, errorInfo] = useCollection(usersCollRef);
  const [arrToShow, setArr] = useState([]);
  const [arrFiltered, setArrFilt] = useState([]);
  const [loadingToast, setloadingToast] = useState(null);
  const [areSure, setareSure] = useState(false);
  const navigate = useNavigate();
  const [userUserName, setuserUserName] = useState("");
  console.log("user ===", user);

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
      console.log("arrK ===", arrK);
    }
  }, [value]);

  useEffect(() => {
    if (valueInfo) {
      let searchIt = valueInfo.docs;
      console.log("searchIt ===", searchIt);
      searchIt = searchIt.find((doc) => doc._document.data.value.mapValue.fields.userUid.stringValue == user.uid);
      //console.log("value.docs.data ===", value.docs[0]._document.data.value.mapValue.fields);
      console.log("searchIt ===", searchIt._document.data.value.mapValue.fields.username);
      setuserUserName(searchIt._document.data.value.mapValue.fields.username.stringValue);
    }
  }, [valueInfo]);

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
      <div className={`mx-auto box-border mt-5 max-sm:mt-10 bg-profileBack ${areSure ? "blur-[5px]" : ""}`}>
        {value && (
          <div className={`flex justify-center mr-10 ${isLoggedIn ? "" : "hidden"}`}>
            <div className="bg-white p-[12px]  mb-[20px] max-w-[300px] rounded-[20px] flex ">
              <div className="flex flex-row items-center">
                <img className="inline p-[8px] mr-[5px]  rounded-[16px]" src="src/assets/images/hello.svg" alt="" />
                <p className="text-grey">
                  Hello, <span className="text-black font-bold">{userUserName}</span>
                </p>
              </div>
            </div>
          </div>
        )}
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
        <div className="flex items-center justify-between mt-[35px] px-[30px] min-[700px]:px-[100px]   ">
          <h3 className="text-left text-[20px]">Public quiz</h3>
          <img className="cursor-pointer" onClick={() => navigate(isLoggedIn ? "/quiz" : "/register")} src="src/assets/images/arrow-leftarrow.svg" alt="" />
        </div>

        {/* Public quiz list */}
        {value && (
          <div>
            {arrK.slice(0, 2).map((obj) => {
              if (obj.public.booleanValue) {
                return (
                  <div key={Math.random()} className="flex flex-col items-center">
                    <div onClick={() => setareSure(!areSure)} className="bg-white cursor-pointer p-[20px] rounded-[20px] flex gap-5 mt-[25px] w-1/2  max-sm:w-full">
                      <img className="bg-lightBlue p-[15px] rounded-[20px]" src="src/assets/images/Group 14cate.svg" alt="" />
                      <div className="flex flex-col w-full items-start justify-around">
                        <h3 className="text-[15px]">{obj.name.stringValue}</h3>
                        <p className="text-[12px]">{obj.category.stringValue.charAt(0).toUpperCase() + obj.category.stringValue.slice(1)}</p>
                        <div className="flex w-full justify-between">
                          <h5 className="text-[10px] text-grey">THG89X</h5>
                          <p className=" text-[10px] text-grey font-bold pr-[20px]">
                            <span>
                              <img className="inline " src="src/assets/images/awardmedalblue.svg" alt="" />
                            </span>{" "}
                            {obj.results.integerValue / obj.completed.integerValue}%
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              }
              // Returns nothing if obj.public.booleanValue is false
            })}
          </div>
        )}
        {/* Public Quiz END */}
      </div>

      {areSure && (
        <div className="statsMid max-sm:w-2/3 flex flex-col justify-center">
          <img src="src/assets/images/Group 13start.svg" alt="" />
          <h2 className="text-black text-[20px] mb-[20px] font-normal">Are you ready to start quiz:</h2>
          <h2 className="text-black text-[20px] mb-[20px] font-normal">Quiz Name</h2>
          <form onSubmit={() => console.log("laba diena")}>
            <button type="submit" className="bg-blue p-[6px] cursor-pointer mt-[30px] text-white w-full max-w-[400px] rounded-[20px] flex justify-center hover:text-grey hover:border-white ">
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

export default UserHomePage;
