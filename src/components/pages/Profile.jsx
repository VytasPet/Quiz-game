import React, { useState } from "react";
import { useAuthCtx } from "../../store/AuthProvider";
import { useCollection } from "react-firebase-hooks/firestore";
import { collection, deleteDoc, doc } from "firebase/firestore";
import { db } from "../../firebase/firebase";
import { useEffect } from "react";

function Profile() {
  const { user } = useAuthCtx();

  const quizCollRef = collection(db, "users");
  const [value, loading, error] = useCollection(quizCollRef);
  const [useris, setuser] = useState({});

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
      <p className="border-y py-2 w-1/2">Created Quiz: {useris.created}</p>
      <p className="border-y py-2 w-1/2">Quiz Completed: {useris.completed}</p>
      <p className="border-y py-2 w-1/2">Average result: 86% {Number(useris.result) / Number(useris.completed)}%</p>
    </div>
  );
}

export default Profile;
