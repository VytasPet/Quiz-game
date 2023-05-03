import React, { useState } from "react";
import { useAuthCtx } from "../../store/AuthProvider";
import { useCollection } from "react-firebase-hooks/firestore";
import { collection, deleteDoc, doc } from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";
import { useEffect } from "react";

function Profile() {
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
      console.log("valuesUsers ===", valuesUsers);

      // Sort valuesUsers by average
      valuesUsers.sort((a, b) => b.average - a.average);

      console.log(valuesUsers);
      setsortArr(valuesUsers);
    }
  }, [value]);

  function findUserIndex(userUid, sortedArray) {
    return sortedArray.findIndex((obj) => obj.userUid === userUid);
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
      console.log("kazkas ===", valuesUsers);
      const thisUser = valuesUsers.find((quiz) => quiz.userUid === user.uid);
      console.log("thisUser ===", thisUser);
      setuser(thisUser);
    }
  }, [value]);

  return (
    <div className="mt-20 box-border flex flex-col items-center bg-grey space-y-4 space-b-10 rounded-lg p-5">
      <h1 className="text-5xl mb-10">Your Statistic</h1>
      <p className="border-y py-2 w-1/2">Your ranking: {position}</p>
      <p className="border-y py-2 w-1/2">Created Quiz: {useris.created}</p>
      <p className="border-y py-2 w-1/2">Quiz Completed: {useris.completed}</p>
      <p className="border-y py-2 w-1/2">Average result: {(Number(useris.result) / Number(useris.completed > 1 ? useris.completed : 1)).toFixed(2)}%</p>
    </div>
  );
}

export default Profile;
