import React, { useState } from "react";
import { useAuthCtx } from "../../store/AuthProvider";
import { useCollection } from "react-firebase-hooks/firestore";
import { collection, deleteDoc, doc } from "firebase/firestore";
import { auth, db } from "../../firebase/firebaseConfig";
import { useEffect } from "react";
import { useSignOut } from "react-firebase-hooks/auth";
import { Navigate, useNavigate } from "react-router-dom";


function Profile() {

  const { user } = useAuthCtx();
  const quizCollRef = collection(db, "users");
  const [value, loading, error] = useCollection(quizCollRef);
  const [useris, setuser] = useState({});
  const [sortArr, setsortArr] = useState([]);
  const [position, setposition] = useState("loading...");
  const [showStats, setshowStats] = useState(false);
  const [editProf, seteditProf] = useState(false);
  const [changePass, setchangePass] = useState(false);
  const [signOut] = useSignOut(auth);
  const navigate = useNavigate();

  //calculating users avg result
  function calculateAverage(userObj) {
    if (userObj.completed === 0) {
      return 0;
    }
    return (userObj.result / userObj.completed) * 100;
  }

  function logoutinimas(){
    signOut();
    navigate('/');
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
    <div> 
    <div className={`relative flex flex-col items-center px-6 py-10 max-w-1/2 mb-10 mt-10 bg-profileBack text-grey rounded-[16px] ${showStats || editProf || changePass ? 'blur-[5px]' : ''}`}>
      
      <div className="relative mb-6">
      <img className="" src="src/assets/images/happywinner.svg" alt="" />
      <img className="absolute top-[50%]" src="src/assets/images/addpic.svg" alt="" />
      </div>
      <h1 className="text-[26px] font-bold text-black mb-2">Your username</h1>
      <h2 className="text-[16px] text-blue bg-lightBlue py-[14px] px-[30px] mb-[45px] rounded-[20px]">{useris.email}</h2>
      <div className="bg-white p-[12px]  mb-[30px] w-1/2 max-w-[400px] rounded-[20px] flex justify-between " onClick={()=>seteditProf(!editProf)}>
        <div className="flex flex-row items-center">
        <img className="inline p-[8px] mr-[15px] bg-lightBlue rounded-[16px]" src="src/assets/images/personprofileEd.svg" alt="" />
        <p>Edit profile</p>
        </div>
        <img src="src/assets/images/chevron-downgoin.svg" alt="" />
      </div>
      <div className="bg-white p-[12px] cursor-pointer mb-[30px] w-1/2 max-w-[400px] rounded-[20px] flex justify-between " onClick={()=>setshowStats(!showStats)}>
        <div className="flex flex-row items-center">
        <img className="inline p-[8px] mr-[15px] bg-lightBlue rounded-[16px]" src="src/assets/images/awardstats.svg" alt="" />
        <p>Your stats</p>
        </div>
        <img src="src/assets/images/chevron-downgoin.svg" alt="" />
      </div>
      <div className="bg-white p-[12px] mb-[30px] w-1/2 max-w-[400px] cursor-pointer rounded-[20px] flex justify-between " onClick={()=>setchangePass(!changePass)}>
        <div className="flex flex-row items-center">
        <img className="inline p-[12px] mr-[15px] bg-lightBlue rounded-[16px]" src="src/assets/images/Unionpass.svg" alt="" />
        <p>Change password</p>
        </div>
        <img src="src/assets/images/chevron-downgoin.svg" alt="" />
      </div>
      <div className="bg-white p-[12px] mb-[30px] w-1/2 max-w-[400px] cursor-pointer rounded-[20px] flex justify-between " onClick={logoutinimas}>
        <div className="flex flex-row items-center">
        <img className="inline p-[8px] mr-[15px] bg-lightBlue rounded-[16px]" src="src/assets/images/exitlogout.svg" alt="" />
        <p>Log out</p>
        </div>
        <img src="src/assets/images/chevron-downgoin.svg" alt="" />
      </div>
      {/* <p className="border-y py-2 w-1/2">Your ranking: {position}</p>
      <p className="border-y py-2 w-1/2">Created Quiz: {useris.created}</p>
      <p className="border-y py-2 w-1/2">Quiz Completed: {useris.completed}</p>
      <p className="border-y py-2 w-1/2">Average result: {(Number(useris.result) / Number(useris.completed > 1 ? useris.completed : 1)).toFixed(2)}%</p>
       */}
          

    </div>

    {/* VIEW STATS */}
    {showStats &&  
      <div className="statsMid">

            <div className="bg-white p-[12px] font-light mb-[10px] w-full max-w-[400px] rounded-[20px] flex justify-between ">
        <div className="flex flex-row items-center">
        <img className="inline p-[8px] mr-[15px] bg-lightBlue rounded-[16px]" src="src/assets/images/usersstatpeopl (1).svg" alt="" />
        <p>Your ranking: {position}</p>
        </div>

      </div>
            <div className="bg-white p-[12px] font-light mb-[10px] w-full max-w-[400px] rounded-[20px] flex justify-between ">
        <div className="flex flex-row items-center">
        <img className="inline p-[8px] mr-[15px] bg-lightBlue rounded-[16px]" src="src/assets/images/edit-2created.svg" alt="" />
        <p>Created Quiz: {useris.created}</p>
        </div>
      </div>
            <div className="bg-white p-[12px] font-light mb-[10px] w-full max-w-[400px] rounded-[20px] flex justify-between ">
        <div className="flex flex-row items-center">
        <img className="inline p-[8px] mr-[15px] bg-lightBlue rounded-[16px]" src="src/assets/images/boxbox.svg" alt="" />
        <p>Quiz Completed: {useris.completed}</p>
        </div>
       
      </div>
            <div className="bg-white p-[12px] font-light mb-[10px] w-full max-w-[400px] rounded-[20px] flex justify-between ">
        <div className="flex flex-row items-center">
        <img className="inline p-[8px] mr-[15px] bg-lightBlue rounded-[16px]" src="src/assets/images/sliderssta.svg" alt="" />
        <p>Average result: {(Number(useris.result) / Number(useris.completed > 1 ? useris.completed : 1)).toFixed(2)}%</p>
        </div>
      </div>
      {/* <p className="border-y py-2 w-full">Your ranking: {position}</p>
      <p className="border-y py-2 w-full">Created Quiz: {useris.created}</p>
      <p className="border-y py-2 w-full">Quiz Completed: {useris.completed}</p>
      <p className="border-y py-2 w-full">Average result: {(Number(useris.result) / Number(useris.completed > 1 ? useris.completed : 1)).toFixed(2)}%</p>
       */}
       <div onClick={()=>setshowStats(!showStats)} className="bg-white p-[12px] border-2 cursor-pointer  mt-[30px] text-red w-full max-w-[400px] rounded-[20px] flex justify-center hover:outline-4 hover:border-blue ">
        <p>Back</p>
      </div>
      </div>
      }
    
    {/* EDIT PROFILE */}
    {editProf &&  
      <div className="statsMid">
          <h2 className="text-black font-light mb-[20px]">Change your username</h2>
          <form onSubmit={()=>console.log('laba diena')}>
            <input placeholder="labas" className="bg-#F6F6F6 p-[12px] text-center mb-[10px] font-light w-full max-w-[400px] rounded-[20px] flex justify-between ">
            </input>
            <button type="submit" className="bg-blue p-[6px] cursor-pointer mt-[30px] text-white w-full max-w-[400px] rounded-[20px] flex justify-center hover:bg-blue hover:text-white hover:border-blue ">
        Change
      </button>
            </form>
      {/* <p className="border-y py-2 w-full">Your ranking: {position}</p>
      <p className="border-y py-2 w-full">Created Quiz: {useris.created}</p>
      <p className="border-y py-2 w-full">Quiz Completed: {useris.completed}</p>
      <p className="border-y py-2 w-full">Average result: {(Number(useris.result) / Number(useris.completed > 1 ? useris.completed : 1)).toFixed(2)}%</p>
       */}

       <div onClick={()=>seteditProf(!editProf)} className="bg-white p-[6px] border-2 cursor-pointer border-lightGray mt-[10px] text-black w-full max-w-[400px] rounded-[20px] flex justify-center hover:outline-4 hover:border-blue ">
        <p>Back</p>
      </div>
      </div>
      }
    
    {/* CHANGE PASSWORD */}
    {changePass &&  
      <div className="statsMid">
          <h2 className="text-black font-light mb-[20px]">Change your password</h2>
          <form onSubmit={()=>console.log('laba diena')}>
            <input placeholder="Password" className="bg-#F6F6F6 p-[12px] text-center mb-[10px] font-light w-full max-w-[400px] rounded-[20px] flex justify-between ">
            </input>
            <input placeholder="Repeat password" className="bg-#F6F6F6 p-[12px] text-center mb-[10px] font-light w-full max-w-[400px] rounded-[20px] flex justify-between ">
            </input>
            <button type="submit" className="bg-blue p-[6px] cursor-pointer mt-[30px] text-white w-full max-w-[400px] rounded-[20px] flex justify-center hover:bg-blue hover:text-white hover:border-blue ">
        Change
      </button>
            </form>
      {/* <p className="border-y py-2 w-full">Your ranking: {position}</p>
      <p className="border-y py-2 w-full">Created Quiz: {useris.created}</p>
      <p className="border-y py-2 w-full">Quiz Completed: {useris.completed}</p>
      <p className="border-y py-2 w-full">Average result: {(Number(useris.result) / Number(useris.completed > 1 ? useris.completed : 1)).toFixed(2)}%</p>
       */}

       <div onClick={()=>setchangePass(!changePass)} className="bg-white p-[6px] border-2 cursor-pointer border-lightGray mt-[10px] text-black w-full max-w-[400px] rounded-[20px] flex justify-center hover:outline-4 hover:border-blue ">
        <p>Back</p>
      </div>
      </div>
      }
      </div>
  );
}

export default Profile;
