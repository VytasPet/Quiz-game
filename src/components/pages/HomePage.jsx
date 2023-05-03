import React, { useState } from "react";
import { useEffect } from "react";
import { db } from "../../firebase/firebaseConfig";
import hero from "/src/assets/images/bighero.svg";
import quiz from "/src/assets/images/totalApl.svg";
import { useCollection } from "react-firebase-hooks/firestore";
import { collection, deleteDoc, doc } from "firebase/firestore";

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

      console.log(valuesUsers);
      setsortArr(valuesUsers);
      console.log("sortArr ===", sortArr);
    }
  }, [value]);

  return (
    <div className="flex flex-col items-center">
      <div className="container flex justify-around items-center mx-auto mt-10 max-w-5xl flex-row max-sm:mt-1 max-sm:flex-col">
        <h1 className="p-5 text-6xl text-black leading-normal mt-5 mb-5 text-center w-2/5 max-sm:text-4xl max-sm:w-full max-sm:mb-1">Welcome to the greatest Quiz application</h1>
        <img className="w-1/3" src={hero} alt="hero" />
      </div>
      {sortArr && (
        <div className="w-1/2 right items-center border-none rounded-lg mt-5 bg-black text-white max-sm:w-full max-sm:mt-10">
          <p>Best 3 players</p>
          <div className="flex justify-center gap-5 bg-yellow text-black w-full rounded-lg ">
            <ul className="flex flex-col items-start">
              {value &&
                sortArr.slice(0, 3).map((obj, index) => (
                  <li key={obj.userUid} className="max-sm:text-sm">
                    {index + 1}. {obj.email}
                  </li>
                ))}
            </ul>
            <ul className="flex flex-col ">{value && sortArr.slice(0, 3).map((obj, index) => <li key={obj.userUid}>avg: {obj.average.toFixed(2)}%</li>)}</ul>
          </div>
        </div>
      )}
    </div>
  );
}

export default HomePage;
