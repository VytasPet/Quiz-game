import React, { useState } from "react";
import { useEffect } from "react";
import { db } from "../../firebase/firebaseConfig";
import hero from "/src/assets/images/bighero.svg";
import quiz from "/src/assets/images/totalApl.svg";
import { useCollection } from "react-firebase-hooks/firestore";
import { collection, deleteDoc, doc } from "firebase/firestore";
import { Link } from "react-router-dom";

function HomePage() {
  const [sortArr, setsortArr] = useState([]);
  const quizCollRef = collection(db, "users");
  const [value, loading, error] = useCollection(quizCollRef);

  function calculateAverage(userObj) {
    if (userObj.completed === 0) {
      return 0;
    }
    return userObj.result / userObj.completed;
  }

  useEffect(() => {
    if (value) {
      const bendras = value.docs;
      const valuesUsers = bendras.map((quiz) => quiz.data());

      // Calculate averages and add to valuesUsers
      valuesUsers.forEach((userObj) => {
        userObj.average = calculateAverage(userObj);
      });

      // Sort valuesUsers by average
      valuesUsers.sort((a, b) => b.average - a.average);

      // console.log(valuesUsers);
      setsortArr(valuesUsers);
      // console.log("sortArr ===", sortArr);
    }
  }, [value]);

  return (
    <div className="flex flex-col absolute left-[50%] top-[60%] translate-x-[-50%] translate-y-[-60%] h-[60vh] gap-[30px] justify-center items-center">
      <h1 className="text-[24px] font-bold">Interactive Quiz</h1>
      <img src="src/assets/images/boxlogoMel.svg" alt="" />
      <h3 className="font-light w-2/3 text-[20px] max-sm:text-[14px]">Create, solve quizzes publicly or privately, and enhance your ratings on our Quiz Page!</h3>
      <Link to={"/register"} className="px-[45px] py-[13px] max-w-full rounded-[16px] bg-blue text-white z-10">
        Start here!
      </Link>
    </div>
  );
}

export default HomePage;
