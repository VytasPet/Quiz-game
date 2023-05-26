import React, { useState } from "react";
import { useEffect } from "react";
import { db } from "../../firebase/firebaseConfig";
import hero from "/src/assets/images/bighero.svg";
import quiz from "/src/assets/images/totalApl.svg";
import { useCollection } from "react-firebase-hooks/firestore";
import { collection, deleteDoc, doc } from "firebase/firestore";

function LeaderBoard() {
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
    <div className="flex flex-col items-center justify-center bg-blue">
      <div className="container flex flex-col mx-auto mt-10 max-w-5xl justify-center items-center max-sm:flex-col max-sm:mt-[35px]">
        {sortArr && (
          <div className="w-1/2 right items-center border-none rounded-lg font-bold text-white max-sm:w-full">
            <p className="mb-[35px] max-sm:text-[16px] font-normal">Leaderboard</p>
            {/* <div className="flex justify-between mb-5 p-1 bg-white text-white gap-5 bg-yellow w-full rounded-[13px] ">
              <p className="py-3 w-1/3 text-grey rounded-[13px]">All Time</p>
              <p className="py-3 w-1/3 bg-blue rounded-[13px]">Week</p>
              <p className="py-3 w-1/3 text-grey rounded-[13px]">Month</p>
            </div> */}
            <div className="flex justify-around  gap-5 bg-yellow text-black w-full rounded-lg ">
              <ul className="flex items-end max-w-full max-h-full justify-end max-md: text-xs">
                {value &&
                  sortArr.slice(0, 3).map((obj, index) => (
                    <li
                      key={obj.userUid}
                      className={`max-sm:text-sm  flex flex-col text-white font-medium w-1/3 w-max-full text-lg justify-end bg-cover rounded-t-3xl ${index === 0 ? "h-52" : "h-40"}`}
                      style={{ order: index === 1 ? -1 : index }}
                    >
                      {index + 1}.{" "}
                      {index + 1 === 3 ? (
                        <div className="relative flex items-end w-full justify-center">
                          <div className="absolute flex flex-col w-full max-w-full items-center">
                            <div className="absolute max-w-[60%] max-sm:top-[-30%]">
                              <img className="absolute bottom-[-10%] left-[35%]" src="src/assets/images/thirdPl.svg" alt="" />
                              <img className="" src="src/assets/images/happyWinner.svg" alt="" />
                            </div>
                            <img className="w-4/5 max-ms:w-2/3" src="src/assets/images/2-3Place.svg" w-full alt="lab" />
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
                              <div>
                                <img className="absolute top-[-40%] left-[30%] max-sm:top-[-40%]" src="src/assets/images/crownking.svg" alt="" />
                                <img src="src/assets/images/happyWinner.svg" alt="" />
                              </div>
                              <img className="absolute bottom-[-10%] left-[35%]" src="src/assets/images/firstPL.svg" alt="" />
                            </div>
                            <img className="w-full max-ms:w-4/5" src="src/assets/images/1stStep.svg" alt="lab" />
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
                              <img className="" src="src/assets/images/happyWinner.svg" alt="" />
                            </div>
                            <img className="w-4/5 max-ms:w-2/3" src="src/assets/images/2-3Place.svg" w-full alt="lab" />
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
        <div className="w-1/2">
          <div className=" space-y-4 border p-5 mt-[35px] bg-profileBack rounded-[20px] flex items-center justify-center text-blue ">
            <div className="flex flex-wrap max-sm:flex-col">
              <div className="w-full max-sm:w-full pr-2 ">
                {/* Sigle place */}
                <div className="flex items-center gap-[30px] max-sm:gap-[10px]">
                  <p className="">4</p>
                  <div className="bg-white p-[12px] font-light mb-[10px] w-full rounded-[20px] flex justify-between ">
                    <div className="flex items-center w-full justify-between ">
                      <img className="inline p-[8px] mr-[15px] bg-lightBlue rounded-[16px]" src="src/assets/images/usersstatpeopl (1).svg" alt="" />
                      <div className="w-full flex justify-center items-center ">
                        <p className="text-black font-normal mr-[30px] max-sm:mr-[15px] max-sm:text-[12px]">Zaidejo nickas</p>
                        <p className="text-red max-sm:text-[12px]">87.5%</p>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Single place END */}
                {/* Sigle place */}
                <div className="flex items-center gap-[30px] max-sm:gap-[10px]">
                  <p className="">4</p>
                  <div className="bg-white p-[12px] font-light mb-[10px] w-full rounded-[20px] flex justify-between ">
                    <div className="flex items-center w-full justify-between ">
                      <img className="inline p-[8px] mr-[15px] bg-lightBlue rounded-[16px]" src="src/assets/images/usersstatpeopl (1).svg" alt="" />
                      <div className="w-full flex justify-center items-center ">
                        <p className="text-black font-normal mr-[30px] max-sm:mr-[15px] max-sm:text-[12px]">Zaidejo nickas</p>
                        <p className="text-red max-sm:text-[12px]">87.5%</p>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Single place END */}
              </div>
            </div>
          </div>
        </div>
        {/* <img className="w-1/3" src={hero} alt="hero" /> */}
      </div>
    </div>
  );
}

export default LeaderBoard;
