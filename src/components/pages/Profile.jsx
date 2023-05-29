import React, { useState } from "react";
import { useAuthCtx } from "../../store/AuthProvider";
import { useCollection } from "react-firebase-hooks/firestore";
import { collection, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { auth, db } from "../../firebase/firebaseConfig";
import { useEffect } from "react";
import { useSignOut } from "react-firebase-hooks/auth";
import { Navigate, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { getAuth, updatePassword } from "firebase/auth";

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
  const [editImage, seteditImage] = useState(false);
  const [userDocId, setuserDocId] = useState("");
  const [avatarChoose, setavatarChoose] = useState("");
  const [signOut] = useSignOut(auth);
  const navigate = useNavigate();

  //calculating users avg result
  function calculateAverage(userObj) {
    if (userObj.completed === 0) {
      return 0;
    }
    return (userObj.result / userObj.completed) * 100;
  }

  function logoutinimas() {
    signOut();
    navigate("/");
  }

  useEffect(() => {
    if (value) {
      const bendras = value.docs;
      const valuesUsers = bendras.map((quiz) => quiz.data());
      console.log("user ===", user);

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
  function changeUsername(e) {
    e.preventDefault();
    const newUserName = e.target[0].value;
    const userDocId = user.uid;
    const docRef = doc(db, "users", userDocId);
    try {
      updateDoc(docRef, { username: newUserName });
      toast.success("Username change completed!");
      seteditProf(false);
    } catch (error) {
      console.error("Error updating document: ", error);
      toast.error("Unable to change username!");
    }
  }

  function changePassword(e) {
    e.preventDefault();
    const newPass = e.target[0].value;
    console.log("newPass ===", newPass);
    const newPass2 = e.target[1].value;
    console.log("newPass2 ===", newPass2);
    console.log("auth.currentUser ===", auth.currentUser);

    if (newPass !== newPass2) {
      toast.error("Password not match!");
      e.target[0].value = "";
      e.target[1].value = "";
      return;
    }

    const updatePasswordHook = async (newPass) => {
      if (newPass.length < 6) {
        toast.error("At least 6 characters!");
        return;
      }

      try {
        if (auth.currentUser) {
          await updatePassword(auth.currentUser, newPass);
          console.log("Password updated successfully");
          toast.success("Password change completed!");
        }
      } catch (error) {
        console.error("Error updating password: ", error);
        toast.error("Unable to change password!");
      }
    };

    updatePasswordHook(newPass);

    // try {
    //   {
    //     updatePassword(auth.currentUser, newPass);
    //     console.log("Password updated successfully");
    //     toast.success("Password change completed!");
    //     //   setchangePass(false);
    //   }
    // } catch (error) {
    //   console.error("Error updating password: ", error);
    //   toast.error("Unable to change password!");
    // }

    // const userDocId = user.uid;
    // const docRef = doc(db, "users", userDocId);
    // try {
    //   updateDoc(docRef, { username: newPass });
    //   toast.success("Password change completed!");
    //   setchangePass(false);
    // } catch (error) {
    //   console.error("Error updating document: ", error);
    //   toast.error("Unable to change password!");
    // }
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
      <div
        className={`relative flex flex-col items-center px-6 py-10 max-w-1/2 mb-10 mt-10 bg-profileBack text-grey rounded-[16px] ${
          showStats || editProf || changePass || editImage ? "blur-[5px]" : ""
        }`}
      >
        <div onClick={() => seteditImage(!editImage)} className="relative mb-6 cursor-pointer">
          <img className="" src="src/assets/images/happywinner.svg" alt="" />
          <img className="absolute top-[50%]" src="src/assets/images/addpic.svg" alt="" />
        </div>
        <h1 className="text-[26px] font-bold text-black mb-2">{useris.username}</h1>
        <h2 className="text-[16px] text-blue bg-lightBlue py-[14px] px-[30px] mb-[45px] rounded-[20px]">{useris.email}</h2>
        <div className="bg-white p-[12px]  mb-[30px] w-1/2 max-w-[400px] rounded-[20px] flex justify-between max-sm:w-full" onClick={() => seteditProf(!editProf)}>
          <div className="flex flex-row items-center">
            <img className="inline p-[8px] mr-[15px] bg-lightBlue rounded-[16px]" src="src/assets/images/personprofileEd.svg" alt="" />
            <p>Edit username</p>
          </div>
          <img src="src/assets/images/chevron-downgoin.svg" alt="" />
        </div>
        <div className="bg-white p-[12px] cursor-pointer mb-[30px] w-1/2 max-w-[400px] rounded-[20px] flex justify-between max-sm:w-full" onClick={() => setshowStats(!showStats)}>
          <div className="flex flex-row items-center">
            <img className="inline p-[8px] mr-[15px] bg-lightBlue rounded-[16px]" src="src/assets/images/awardstats.svg" alt="" />
            <p>Your stats</p>
          </div>
          <img src="src/assets/images/chevron-downgoin.svg" alt="" />
        </div>
        <div className="bg-white p-[12px] mb-[30px] w-1/2 max-w-[400px] cursor-pointer rounded-[20px] flex justify-between max-sm:w-full" onClick={() => setchangePass(!changePass)}>
          <div className="flex flex-row items-center">
            <img className="inline p-[12px] mr-[15px] bg-lightBlue rounded-[16px]" src="src/assets/images/Unionpass.svg" alt="" />
            <p>Change password</p>
          </div>
          <img src="src/assets/images/chevron-downgoin.svg" alt="" />
        </div>
        <div className="bg-white p-[12px] mb-[30px] w-1/2 max-w-[400px] cursor-pointer rounded-[20px] flex justify-between max-sm:w-full" onClick={logoutinimas}>
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
      {showStats && (
        <div className="statsMid w-2/3 max-w-[600px] max-sm:w-2/3 max-lg:2/3 flex flex-col items-center justify-center">
          <img className="p-0 m-0 max-h-[235px] max-w-[239px] " src="src/assets/images/Group 25stats.svg" alt="" />
          <div className="bg-white p-[12px] font-light mb-[10px] max-w-[400px] w-full min-sm:w-2/3 rounded-[20px] flex justify-between ">
            <div className="flex flex-row items-center">
              <img className="inline p-[8px] mr-[15px] bg-lightBlue  rounded-[16px]" src="src/assets/images/usersstatpeopl (1).svg" alt="" />
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
          <div
            onClick={() => setshowStats(!showStats)}
            className="bg-white p-[12px] border-2 cursor-pointer mt-[30px] text-red w-1/2 max-w-[300px] rounded-[20px] flex justify-center hover:outline-4 hover:border-blue "
          >
            <p className="w-1/2">Back</p>
          </div>
        </div>
      )}

      {/* EDIT IMAGE */}
      {editImage && (
        <div className="statsMid max-sm:w-2/3 w-2/3 max-w-[400px] flex flex-col items-center justify-center">
          <div className="flex justify-center flex-wrap gap-2 mb-[20px]">
            <img onClick={() => setavatarChoose(1)} className="w-1/4" src="src/assets/images/man.png" alt="" />
            <img onClick={() => setavatarChoose(2)} className="w-1/4" src="src/assets/images/businessman.png" alt="" />
            <img onClick={() => setavatarChoose(3)} className="w-1/4" src="src/assets/images/user.png" alt="" />
            <img onClick={() => setavatarChoose(4)} className="w-1/4" src="src/assets/images/woman2.png" alt="" />
            <img onClick={() => setavatarChoose(5)} className="w-1/4" src="src/assets/images/profile (1).png" alt="" />
          </div>
          <h2 className="text-black font-light mb-[20px]">Choose your profile picture</h2>
          <h2 className="text-black font-light mb-[20px]">Or upload your picture:</h2>
          <form>
            <input placeholder="Picture URL" className="bg-#F6F6F6  p-[12px] text-center mb-[30px] font-light w-2/3 max-w-[400px] rounded-[20px] flex justify-between "></input>
            <button type="submit" className="bg-blue p-[6px] cursor-pointer mt-[10px] text-white w-full rounded-[20px] flex justify-center hover:bg-blue hover:text-white hover:border-blue ">
              Change
            </button>
          </form>
          {/* <p className="border-y py-2 w-full">Your ranking: {position}</p>

          </form>
<p className="border-y py-2 w-full">Created Quiz: {useris.created}</p>
<p className="border-y py-2 w-full">Quiz Completed: {useris.completed}</p>
<p className="border-y py-2 w-full">Average result: {(Number(useris.result) / Number(useris.completed > 1 ? useris.completed : 1)).toFixed(2)}%</p>
*/}

          <div
            onClick={() => seteditImage(!editImage)}
            className="bg-white p-[6px] border-2 cursor-pointer border-lightGray mt-[10px] text-black w-full max-w-[400px] rounded-[20px] flex justify-center hover:outline-4 hover:border-blue "
          >
            <p>Back</p>
          </div>
        </div>
      )}

      {/* EDIT PROFILE */}
      {editProf && (
        <div className="statsMid max-sm:w-2/3 w-2/3 max-w-[400px] flex flex-col items-center justify-center">
          <img className="p-0 m-0" src="src/assets/images/emojircok.svg" alt="" />
          <h2 className="text-black font-light mb-[20px]">Change your username</h2>
          <form className="w-full flex flex-col items-center" onSubmit={changeUsername}>
            <input placeholder="labas" className="bg-#F6F6F6 p-[12px] text-center mb-[10px] font-light w-2/3 max-w-[400px] rounded-[20px] flex justify-between "></input>
            <button type="submit" className="bg-blue p-[6px] cursor-pointer mt-[30px] text-white w-full rounded-[20px] flex justify-center hover:bg-blue hover:text-white hover:border-blue ">
              Change
            </button>
          </form>
          {/* <p className="border-y py-2 w-full">Your ranking: {position}</p>
    <p className="border-y py-2 w-full">Created Quiz: {useris.created}</p>
    <p className="border-y py-2 w-full">Quiz Completed: {useris.completed}</p>
    <p className="border-y py-2 w-full">Average result: {(Number(useris.result) / Number(useris.completed > 1 ? useris.completed : 1)).toFixed(2)}%</p>
     */}

          <div
            onClick={() => seteditProf(!editProf)}
            className="bg-white p-[6px] border-2 cursor-pointer border-lightGray mt-[10px] text-black w-full max-w-[400px] rounded-[20px] flex justify-center hover:outline-4 hover:border-blue "
          >
            <p>Back</p>
          </div>
        </div>
      )}

      {/* CHANGE PASSWORD */}
      {changePass && (
        <div className="statsMid max-sm:w-2/3 w-2/3 max-w-[400px] flex flex-col items-center justify-center">
          <img className="p-0 m-0" src="src/assets/images/emojircok.svg" alt="" />
          <h2 className="text-black font-light mb-[20px]">Change your password</h2>
          <form className="w-full flex flex-col items-center" onSubmit={changePassword}>
            <input placeholder="Password" className="bg-#F6F6F6  p-[12px] text-center mb-[10px] font-light w-2/3 max-w-[400px] rounded-[20px] flex justify-between "></input>
            <input placeholder="Repeat password" className="bg-#F6F6F6 p-[12px] text-center mb-[10px] font-light w-2/3 max-w-[400px] rounded-[20px] flex justify-between "></input>
            <button type="submit" className="bg-blue p-[6px] cursor-pointer mt-[30px] text-white w-full rounded-[20px] flex justify-center hover:bg-blue hover:text-white hover:border-blue ">
              Change
            </button>
          </form>
          {/* <p className="border-y py-2 w-full">Your ranking: {position}</p>
      <p className="border-y py-2 w-full">Created Quiz: {useris.created}</p>
      <p className="border-y py-2 w-full">Quiz Completed: {useris.completed}</p>
      <p className="border-y py-2 w-full">Average result: {(Number(useris.result) / Number(useris.completed > 1 ? useris.completed : 1)).toFixed(2)}%</p>
       */}

          <div
            onClick={() => setchangePass(!changePass)}
            className="bg-white p-[6px] border-2 cursor-pointer border-lightGray mt-[10px] text-black w-full max-w-[400px] rounded-[20px] flex justify-center hover:outline-4 hover:border-blue "
          >
            <p>Back</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default Profile;
