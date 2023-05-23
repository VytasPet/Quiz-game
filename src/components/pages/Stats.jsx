import React, { useState } from "react";
import { useAuthCtx } from "../../store/AuthProvider";
import { useCollection } from "react-firebase-hooks/firestore";
import { collection, deleteDoc, doc } from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";
import { useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";

function Stats() {
    const navigate = useNavigate();
  const { user } = useAuthCtx();
  const quizCollRef = collection(db, "users");
  const [value, loading, error] = useCollection(quizCollRef);
  const [useris, setuser] = useState({});
  const [sortArr, setsortArr] = useState([]);
  const [position, setposition] = useState("loading...");

  //calculating users avg result
  function calculateAverage(userObj) {
    if (userObj.completed === 0) {
      return 0;
    }
    return (userObj.result / userObj.completed) * 100;
  }

  useEffect(() => {
    if (value) {
      const bendras = value.docs;
      const valuesUsers = bendras.map((quiz) => quiz.data());

      // Calculate averages and add to valuesUsers
      valuesUsers.forEach((userObj) => {
        userObj.average = calculateAverage(userObj);
      });
      // console.log("valuesUsers ===", valuesUsers);

      // Sort valuesUsers by average
      valuesUsers.sort((a, b) => b.average - a.average);

      // console.log(valuesUsers);
      setsortArr(valuesUsers);
    }
  }, [value]);

  function findUserIndex(userUid, sortedArray) {
    return sortedArray.findIndex((obj) => obj.userUid === userUid);
  }

  useEffect(() => {
    const userIndex = findUserIndex(user.uid, sortArr);
    // console.log("User ranking position:", userIndex + 1);
    setposition(userIndex + 1);
  }, [sortArr]);

  useEffect(() => {
    if (value) {
      const bendras = value.docs;
      const valuesUsers = bendras.map((quiz) => quiz.data());
      // console.log("kazkas ===", valuesUsers);
      const thisUser = valuesUsers.find((quiz) => quiz.userUid === user.uid);
      // console.log("thisUser ===", thisUser);
      setuser(thisUser);
    }
  }, [value]);

  return (
    <div className="flex flex-col items-center px-6 py-10 max-w-1/2 mb-10 mt-10 bg-profileBack text-grey rounded-[16px]">
      <div className="relative mb-6">
      <img className="" src="src/assets/images/happywinner.svg" alt="" />
      <img className="absolute top-[50%]" src="src/assets/images/addpic.svg" alt="" />
      </div>
      <h1 className="text-[26px] font-bold text-black mb-2">Your username</h1>
      <h2 className="text-[16px] text-blue bg-lightBlue py-[14px] px-[30px] mb-[45px] rounded-[20px]">{useris.email}</h2>
      <div className="bg-white p-[12px]  mb-[30px] w-1/2 max-w-[400px] rounded-[20px] flex justify-between ">
        <div className="flex flex-row items-center">
        <img className="inline p-[8px] mr-[15px] bg-lightBlue rounded-[16px]" src="src/assets/images/personprofileEd.svg" alt="" />
        <p>Edit profile</p>
        </div>
        <img src="src/assets/images/chevron-downgoin.svg" alt="" />
      </div>
      <div onClick={()=>navigate('/stats')} className="bg-white p-[12px] cursor-pointer mb-[30px] w-1/2 max-w-[400px] rounded-[20px] flex justify-between ">
        <div className="flex flex-row items-center">
        <img className="inline p-[8px] mr-[15px] bg-lightBlue rounded-[16px]" src="src/assets/images/awardstats.svg" alt="" />
        <p>Your stats</p>
        </div>
        <img src="src/assets/images/chevron-downgoin.svg" alt="" />
      </div>
      <div className="bg-white p-[12px] mb-[30px] w-1/2 max-w-[400px] rounded-[20px] flex justify-between ">
        <div className="flex flex-row items-center">
        <img className="inline p-[12px] mr-[15px] bg-lightBlue rounded-[16px]" src="src/assets/images/Unionpass.svg" alt="" />
        <p>Change password</p>
        </div>
        <img src="src/assets/images/chevron-downgoin.svg" alt="" />
      </div>
      <div className="bg-white p-[12px] mb-[30px] w-1/2 max-w-[400px] rounded-[20px] flex justify-between ">
        <div className="flex flex-row items-center">
        <img className="inline p-[8px] mr-[15px] bg-lightBlue rounded-[16px]" src="src/assets/images/exitlogout.svg" alt="" />
        <p>Log out</p>
        </div>
        <img src="src/assets/images/chevron-downgoin.svg" alt="" />
      </div>
      <p className="border-y py-2 w-1/2">Your ranking: {position}</p>
      <p className="border-y py-2 w-1/2">Created Quiz: {useris.created}</p>
      <p className="border-y py-2 w-1/2">Quiz Completed: {useris.completed}</p>
      <p className="border-y py-2 w-1/2">Average result: {(Number(useris.result) / Number(useris.completed > 1 ? useris.completed : 1)).toFixed(2)}%</p>
    </div>
  );
}

export default Stats;