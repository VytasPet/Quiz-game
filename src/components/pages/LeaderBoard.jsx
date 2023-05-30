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
      valuesUsers.sort((a, b) => b.result - a.result);

      // console.log(valuesUsers);
      setsortArr(valuesUsers);
      // console.log("sortArr ===", sortArr);
    }
  }, [value]);

  return (
    <div className="flex flex-col items-center justify-center bg-blue">
      <div className="container flex flex-col mx-auto mt-10 max-w-5xl justify-center items-center max-sm:flex-col max-sm:mt-[35px]">
        {sortArr && (
          <div className="w-2/3 right items-center border-none rounded-lg font-bold text-white max-[730px]:w-full max-[930px]:w-4/5">
            <p className="mb-[35px] max-sm:text-[16px] font-normal">Leaderboard</p>
            {/* <div className="flex justify-between mb-5 p-1 bg-white text-white gap-5 bg-yellow w-full rounded-[13px] ">
              <p className="py-3 w-1/3 text-grey rounded-[13px]">All Time</p>
              <p className="py-3 w-1/3 bg-blue rounded-[13px]">Week</p>
              <p className="py-3 w-1/3 text-grey rounded-[13px]">Month</p>
            </div> */}
            <div className="flex justify-around gap-5 bg-yellow text-black w-full mt-[170px] max-[520px]:mt-[100px] max-[440px]:mt-[50px]  rounded-lg  ">
              <ul className="flex items-end max-w-full w-full justify-end ">
                {value &&
                  sortArr.slice(0, 3).map((obj, index) => (
                    <li
                      key={obj.userUid}
                      className={`max-sm:text-sm  flex flex-col text-white font-medium w-1/3 w-max-full text-lg justify-end bg-cover rounded-t-3xl ${index === 0 ? "h-52" : "h-40"}`}
                      style={{ order: index === 1 ? -1 : index }}
                    >
                      {index + 1 === 3 ? (
                        <div className="relative flex items-end w-full justify-center">
                          <div className="absolute flex flex-col w-full max-w-full items-center">
                            <div className="absolute max-w-[60%] max-sm:top-[-30%]">
                              <img className="absolute bottom-[-10%] left-[40%]" src="src/assets/images/Group 83placemedal.svg" alt="" />
                              <img
                                className="border-4 border-green rounded-[50%] h-[88px] w-[88px] max-sm:h-[68px] max-sm:w-[68px]"
                                src={`${obj.profilePic ? obj.profilePic : "src/assets/images/happyWinner.svg"}`}
                                alt=""
                              />
                            </div>
                            <img className="w-4/5 " src="src/assets/images/2-3Place.svg" w-full alt="lab" />
                          </div>
                          <div>
                            <p className="mb-[20px]">{obj.username}</p>
                            <p className="mb-[10px] font-medium">
                              {obj.result ? obj.result : "0"}
                              <span className="font-light text-red"> pts</span>
                            </p>
                          </div>
                        </div>
                      ) : index + 1 === 1 ? (
                        <div className="relative flex items-end w-full justify-center">
                          <div className="absolute flex flex-col w-full items-center ">
                            <div className="absolute max-w-[70%] max-sm:top-[-30%] flex flex-col items-center">
                              <div>
                                <img className="absolute top-[-40%] left-[32%] max-sm:left-[25%]" src="src/assets/images/crownking.svg" alt="" />
                                <img
                                  className="border-4 border-green rounded-[50%] h-[88px] w-[88px] max-sm:h-[68px] max-sm:w-[68px]"
                                  src={`${obj.profilePic ? obj.profilePic : "src/assets/images/happyWinner.svg"}`}
                                  alt=""
                                />
                              </div>
                              <img className="absolute bottom-[-10%] left-[40%] max-sm:left-[38%]" src="src/assets/images/Group 7firstplace.svg" alt="" />
                            </div>
                            <img className="w-full " src="src/assets/images/1stStep.svg" alt="lab" />
                          </div>
                          <div>
                            <p className="mb-[20px]">{obj.username}</p>
                            <p className="mb-[10px] font-medium">
                              {obj.result ? obj.result : "0"}
                              <span className="font-light text-red"> pts</span>
                            </p>
                          </div>
                        </div>
                      ) : (
                        <div className="relative flex items-end w-full justify-center">
                          <div className="absolute flex flex-col w-full max-w-full items-center">
                            <div className="absolute max-w-[60%] max-sm:top-[-30%]">
                              <img className="absolute bottom-[-10%] left-[40%] max-sm:left-[38%]" src="src/assets/images/secPL.svg" alt="" />
                              <img
                                className="border-4 border-green rounded-[50%] h-[88px] w-[88px] max-sm:h-[68px] max-sm:w-[68px]"
                                src={`${obj.profilePic ? obj.profilePic : "src/assets/images/happyWinner.svg"}`}
                                alt=""
                              />
                            </div>
                            <img className="w-4/5 " src="src/assets/images/2-3Place.svg" w-full alt="lab" />
                          </div>
                          <div>
                            <p className="mb-[20px]">{obj.username}</p>
                            <p className="mb-[10px] font-medium">
                              {obj.result ? obj.result : "0"}
                              <span className="font-light text-red"> pts</span>
                            </p>
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
        <div className="w-2/3 max-md:w-full ">
          <div className=" space-y-4 border p-5 mt-[35px] bg-profileBack rounded-[20px] flex items-center justify-center text-blue ">
            <div className="flex flex-wrap max-sm:flex-col">
              <ul className="w-full pr-2 max-[530px]:pr-0 ">
                <ul className="w-full pr-2 max-[530px] pr-0">
                  {value &&
                    sortArr.slice(3, 10).map((obj, index) => (
                      // Single place
                      <li className="flex items-center gap-[30px]">
                        {index + 4 == 10 && <p className="ml-[-10px] max-sm:ml-[-28px] text-center"> {index + 4} </p>}
                        {index + 4 !== 10 && <p className=" max-sm:ml-[-20px] text-center"> {index + 4} </p>}

                        <div className="bg-white p-[12px] font-light mb-[10px] w-full min-[550px]:w-[300px] min-[900px]:w-[500px] rounded-[20px] flex justify-between ">
                          <div className="flex items-center w-full justify-between max-[530px]:justify-center ">
                            <img className="inline mr-[15px] bg-lightBlue rounded-[50px] h-[24px] min-w-[24px] max-w-[24px]" src={obj.profilePic} alt="" />
                            <div className="w-full max-[530px]:w-auto flex justify-between items-between ">
                              <p className="text-black font-normal mr-[30px] max-sm:mr-[15px] max-[530px]:mr-[5px] max-sm:text-[12px] min-[900px]:[text-16px]">{obj.username}</p>
                              <p className="text-red max-sm:text-[12px] min-[900px]:text-[16px] pr-[20px]">{obj.result}</p>
                            </div>
                          </div>
                        </div>
                      </li>
                      // Single place END
                    ))}
                </ul>
              </ul>
            </div>
          </div>
        </div>
        {/* <img className="w-1/3" src={hero} alt="hero" /> */}
      </div>
    </div>
  );
}

export default LeaderBoard;
