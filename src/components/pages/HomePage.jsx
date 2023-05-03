import React, { useState } from "react";
import { useEffect } from "react";
import { db } from "../../firebase/firebase";
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
      <div className="container flex justify-around items-center mx-auto mt-10 max-w-5xl flex-row">
        <h1 className="p-5 text-6xl text-black leading-normal mt-5 mb-5 text-center w-2/5 ">Welcome to the greatest Quiz application</h1>
        <img className="w-1/3" src={hero} alt="hero" />
      </div>
      {sortArr && (
        <div className="w-1/2 right item-center border-none rounded-lg mt-5 bg-black text-white">
          <p>Best 3 players</p>
          <div className="rounded-lg bg-yellow text-black w-full">
            <ul>
              {value &&
                sortArr.slice(0, 3).map((obj, index) => (
                  <li key={obj.userUid}>
                    {index + 1}. {obj.email} - avg: {obj.average.toFixed(2)}%
                  </li>
                ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

export default HomePage;
