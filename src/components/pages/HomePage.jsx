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

      // console.log(valuesUsers);
      setsortArr(valuesUsers);
      // console.log("sortArr ===", sortArr);
    }
  }, [value]);

  return (
    <div className="flex flex-col items-center">
      <div className="container flex justify-around mx-auto mt-10 max-w-5xl flex-row max-sm:mt-1 max-sm:flex-col">
        <h1 className="p-5 text-6xl text-white leading-normal mt-5 mb-5 text-center w-2/5 max-sm:text-4xl max-sm:w-full max-sm:mb-1">Welcome to the greatest Quiz application</h1>
        {sortArr && (
        <div className="w-1/2 right items-center border-none  rounded-lg font-bold mt-5 text-white max-sm:w-full max-sm:mt-10">
          <p className="my-6">Leaderboard</p>
          <div className="flex justify-between mb-5 p-1 bg-white text-white gap-5 bg-yellow text-black w-full rounded-[13px] ">
          <p className="py-3 w-1/3 text-grey rounded-[13px]">All Time</p>
          <p className="py-3 w-1/3 bg-blue rounded-[13px]">Week</p>
          <p className="py-3 w-1/3 text-grey rounded-[13px]">Month</p>
          </div>
          <div className="flex justify-around pt-7 gap-5 bg-yellow text-black w-full rounded-lg ">
          <ul className="flex items-end max-w-full max-h-full justify-end max-sm:mt-10 max-md: text-xs">
  {value &&
    sortArr.slice(0, 3).map((obj, index) => (
      <li
        key={obj.userUid}
        className={`max-sm:text-sm  flex flex-col text-white font-medium w-1/3 w-max-full text-lg justify-end bg-cover rounded-t-3xl ${
          index === 0 ? 'h-52' : 'h-40'
        }`}
        style={{ order: index === 1 ? -1 : index }}
      >
        {index + 1}.{' '}
        {index + 1 === 3 ? (

                      <div className="relative flex items-end w-full justify-center">
          <div className="absolute flex flex-col w-full max-w-full items-center">
            <div className="absolute max-w-[60%] max-sm:top-[-30%]">
            <img className="absolute bottom-[-10%] left-[35%]" src="src/assets/images/thirdPl.svg" alt="" />
          <img className=""  src="src/assets/images/happyWinner.svg" alt="" />
            </div>
          <img className="w-4/5" src="src/assets/images/2-3Place.svg" w-full alt="lab" />
          </div>
          <div>
            {obj.email}
            <p>trecias</p>
          </div>
          </div>
        ) : index + 1 === 1 ? (
          <div className="relative flex items-end w-full justify-center">
            <div className="absolute flex flex-col w-full items-center ">
            <div className="absolute max-w-[70%] max-sm:top-[-30%] flex flex-col items-center">
              <div >
               <img className="absolute top-[-40%] left-[30%] max-sm:top-[-40%]" src="src/assets/images/crownking.svg" alt="" />
               <img  src="src/assets/images/happyWinner.svg"  alt="" />
              </div>
              <img className="absolute bottom-[-10%] left-[35%]"  src="src/assets/images/firstPL.svg" alt="" />
              </div>
            <img className="w-full" src="src/assets/images/1stStep.svg" alt="lab" />
            </div>
            <div>
            <p>{obj.email}</p>
            <p>pirmas</p>
            </div>
          </div>
        ) : (
          
<div className="relative flex items-end w-full justify-center">
          <div className="absolute flex flex-col w-full max-w-full items-center">
            <div className="absolute max-w-[60%] max-sm:top-[-30%]">
            <img className="absolute bottom-[-10%] left-[40%]" src="src/assets/images/secPL.svg" alt="" />
          <img className=""  src="src/assets/images/happyWinner.svg" alt="" />
            </div>
          <img className="w-4/5" src="src/assets/images/2-3Place.svg" w-full alt="lab" />
          </div>
          <div>
            {obj.email}
            <p>antras</p>
          </div>
          </div>
        )}
      </li>
    ))}
</ul>
{/* Procentus rodo: */}
            {/* <ul className="flex flex-col ">{value && sortArr.slice(0, 3).map((obj, index) => <li key={obj.userUid}>avg: {obj.average.toFixed(2)}%</li>)}</ul> */}
          </div>
        </div>
      )}
        {/* <img className="w-1/3" src={hero} alt="hero" /> */}
      </div>

    </div>
  );
}

export default HomePage;
