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
import defaultPic from "/src/assets/images/user.png";
import addPic from "/assets/images/addpic.svg";
import star from "/assets/images/VectorstartQuiz.svg";
import profileEd from "/src/assets/images/personprofileEd.svg";
import award from "/src/assets/images/awardstats.svg";
import union from "/src/assets/images/Unionpass.svg";
import logout from "/src/assets/images/exitlogout.svg";
import statsas from "/src/assets/images/Group 25stats.svg";
import people from "/src/assets/images/usersstatpeopl (1).svg";
import edit2 from "/src/assets/images/edit-2created.svg";
import boxbox from "/src/assets/images/boxbox.svg";
import slider from "/src/assets/images/sliderssta.svg";
import man from "/assets/images/man.png";
import userauskas from "/src/assets/images/user.png";
import businessman from "/src/assets/images/businessman.png";
import woman2 from "/src/assets/images/woman2.png";
import profile1 from "/src/assets/images/profile (1).png";
import emoji from "/src/assets/images/emojircok.svg";
import chevron from "/src/assets/images/chevron-downgoin.svg";

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
    toast.success("You just logged out!");
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
      valuesUsers.sort((a, b) => b.result - a.result);

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

  function changePicture(e) {
    e.preventDefault();
    const newPictureUrl = e.target[0].value;
    const userDocId = user.uid;
    const docRef = doc(db, "users", userDocId);

    if (newPictureUrl) {
      try {
        updateDoc(docRef, { profilePic: newPictureUrl });
        toast.success("Profile picture change completed!");
        seteditImage(false);
      } catch (error) {
        console.error("Error updating document: ", error);
        toast.error("Unable to change profile picture!");
      }
      return;
    } else if (!newPictureUrl && avatarChoose) {
      let newPic = "";
      switch (avatarChoose) {
        case 1:
          newPic = "/src/assets/images/man.png";
          break;
        case 2:
          newPic = "/src/assets/images/businessman.png";
          break;
        case 3:
          newPic = "/src/assets/images/user.png";
          break;
        case 4:
          newPic = "/src/assets/images/woman2.png";
          break;
        case 5:
          newPic = "/src/assets/images/profile (1).png";
      }

      try {
        updateDoc(docRef, { profilePic: newPic });
        toast.success("Avatar change completed!");
        seteditProf(false);
        seteditImage(false);
      } catch (error) {
        console.error("Error updating document: ", error);
        toast.error("Unable to change avatar!");
      }
    } else {
      toast.error("Please choose avatar");
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
          setchangePass(false);
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
    console.log("User ranking position:", userIndex + 1);
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
    <div className="full">
      {value && (
        <div>
          <div
            className={`relative flex flex-col items-center px-6 py-3 max-w-1/2 mb-10 mt-10 bg-profileBack text-grey rounded-[16px] ${
              showStats || editProf || changePass || editImage ? "blur-[5px]" : ""
            }`}
          >
            <div onClick={() => seteditImage(!editImage)} className="relative mb-6 cursor-pointer">
              <img className="w-[88px] h-[88px] rounded-[50px]" src={`${useris.profilePic ? useris.profilePic : defaultPic}`} alt="" />
              <img className="absolute top-[50%]" src={addPic} alt="" />
            </div>
            <h1 className="text-[26px] font-bold text-black mb-2">{useris.username}</h1>
            <h2 className="text-[16px] text-blue bg-lightBlue py-[14px] px-[30px] mb-[45px] rounded-[20px]">{useris.email}</h2>
            <div className="bg-white p-[12px] cursor-pointer mb-[30px] w-1/2 max-w-[400px] rounded-[20px] flex justify-between max-sm:w-full" onClick={() => navigate("/myquiz")}>
              <div className="flex flex-row items-center">
                <img className="inline p-[8px] mr-[15px] bg-lightBlue rounded-[16px]" src={star} alt="" />
                <p>My quiz</p>
              </div>
              <img src={chevron} alt="" />
            </div>
            <div className="bg-white p-[12px]  mb-[30px] w-1/2 max-w-[400px] rounded-[20px] flex justify-between max-sm:w-full" onClick={() => seteditProf(!editProf)}>
              <div className="flex flex-row items-center">
                <img className="inline p-[8px] mr-[15px] bg-lightBlue rounded-[16px]" src={profileEd} alt="" />
                <p>Edit username</p>
              </div>
              <img src={chevron} alt="" />
            </div>

            <div className="bg-white p-[12px] cursor-pointer mb-[30px] w-1/2 max-w-[400px] rounded-[20px] flex justify-between max-sm:w-full" onClick={() => setshowStats(!showStats)}>
              <div className="flex flex-row items-center">
                <img className="inline p-[8px] mr-[15px] bg-lightBlue rounded-[16px]" src={award} alt="" />
                <p>My stats</p>
              </div>
              <img src={chevron} alt="" />
            </div>
            <div className="bg-white p-[12px] mb-[30px] w-1/2 max-w-[400px] cursor-pointer rounded-[20px] flex justify-between max-sm:w-full" onClick={() => setchangePass(!changePass)}>
              <div className="flex flex-row items-center">
                <img className="inline p-[12px] mr-[15px] bg-lightBlue rounded-[16px]" src={union} alt="" />
                <p>Change password</p>
              </div>
              <img src={chevron} alt="" />
            </div>

            <div className="bg-white p-[12px] mb-[30px] w-1/2 max-w-[400px] cursor-pointer rounded-[20px] flex justify-between max-sm:w-full" onClick={logoutinimas}>
              <div className="flex flex-row items-center">
                <img className="inline p-[8px] mr-[15px] bg-lightBlue rounded-[16px]" src={logout} alt="" />
                <p>Log out</p>
              </div>
              <img src={chevron} alt="" />
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
              <img className="p-0 m-0 max-h-[235px] max-w-[239px] " src={statsas} alt="" />
              <div className="bg-white p-[12px] font-light mb-[10px] max-w-[400px] w-full min-sm:w-2/3 rounded-[20px] flex justify-between ">
                <div className="flex flex-row items-center">
                  <img className="inline p-[8px] mr-[15px] bg-lightBlue  rounded-[16px]" src={people} alt="" />
                  <p>Your ranking: {position}</p>
                </div>
              </div>
              <div className="bg-white p-[12px] font-light mb-[10px] w-full max-w-[400px] rounded-[20px] flex justify-between ">
                <div className="flex flex-row items-center">
                  <img className="inline p-[8px] mr-[15px] bg-lightBlue rounded-[16px]" src={edit2} alt="" />
                  <p>Created Quiz: {useris.created}</p>
                </div>
              </div>
              <div className="bg-white p-[12px] font-light mb-[10px] w-full max-w-[400px] rounded-[20px] flex justify-between ">
                <div className="flex flex-row items-center">
                  <img className="inline p-[8px] mr-[15px] bg-lightBlue rounded-[16px]" src={boxbox} alt="" />
                  <p>Quiz Completed: {useris.completed}</p>
                </div>
              </div>
              <div className="bg-white p-[12px] font-light mb-[10px] w-full max-w-[400px] rounded-[20px] flex justify-between ">
                <div className="flex flex-row items-center">
                  <img className="inline p-[8px] mr-[15px] bg-lightBlue rounded-[16px]" src={slider} alt="" />
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
                <img onClick={() => setavatarChoose(1)} className={`${avatarChoose === 1 ? "border-4 border-green " : "rounded-[50px]"} w-1/4 rounded-[50px]`} src={man} alt="" />
                <img onClick={() => setavatarChoose(2)} className={`${avatarChoose === 2 ? "border-4 border-green rounded-[50px]" : "rounded-[50px]"} w-1/4`} src={businessman} alt="" />
                <img onClick={() => setavatarChoose(3)} className={`${avatarChoose === 3 ? "border-4 border-green rounded-[50px]" : "rounded-[50px]"} w-1/4`} src={userauskas} alt="" />
                <img onClick={() => setavatarChoose(4)} className={`${avatarChoose === 4 ? "border-4 border-green rounded-[50px]" : "rounded-[50px]"} w-1/4`} src={woman2} alt="" />
                <img onClick={() => setavatarChoose(5)} className={`${avatarChoose === 5 ? "border-4 border-green rounded-[50px]" : "rounded-[50px]"} w-1/4`} src={profile1} alt="" />
              </div>
              <h2 className="text-black font-light mb-[20px]">Choose your profile picture</h2>
              <h2 className="text-black font-light mb-[20px]">Or upload your picture:</h2>
              <form className="flex w-full flex-col items-center" onSubmit={changePicture}>
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
              <img className="p-0 m-0" src={emoji} alt="" />
              <h2 className="text-black font-medium mb-[20px]">Change your username</h2>
              <form className="w-full flex flex-col items-center" onSubmit={changeUsername}>
                <input
                  placeholder={`${useris.username ? useris.username : "Insert new username"}`}
                  className="bg-#F6F6F6 p-[12px] text-center mb-[10px] font-light w-2/3 max-w-[400px] rounded-[20px] flex justify-between "
                ></input>
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
              <img className="p-0 m-0" src={emoji} alt="" />
              <h2 className="text-black font-medium mb-[20px]">Change your password</h2>
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
      )}
    </div>
  );
}

export default Profile;
