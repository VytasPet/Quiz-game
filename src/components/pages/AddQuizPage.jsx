import { addDoc, collection, doc, updateDoc } from "firebase/firestore";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../../firebase/firebaseConfig";
import QuizForm from "../forms/QuizForm";
import toast from "react-hot-toast";
import { useAuthCtx } from "../../store/AuthProvider";
import { useDocument } from "react-firebase-hooks/firestore";
import { query, where, getDocs } from "firebase/firestore";
import { useState } from "react";
import { useCollection } from "react-firebase-hooks/firestore";

function AddQuizPage() {
  const { user } = useAuthCtx();

  const quizCollRef = collection(db, "users");
  const q = query(quizCollRef, where("userUid", "==", user.uid));
  const [value, loading, error] = useCollection(q);

  const [userDocId, setUserDocId] = useState(null);
  const navigate = useNavigate();
  //   const docRef = doc(db, "quiz", userDocId);
  //   const [values, loadings, errors] = useDocument(docRef);

  useEffect(() => {
    if (value) {
      const userDoc = value.docs.find((doc) => doc.data().userUid === user.uid);
      if (userDoc) {
        // console.log("User document ID:", userDoc.id);
        setUserDocId(userDoc.id);
      } else {
        // console.log("User document not found.");
      }
    }
  }, [value, user]);

  function addCreating() {
    let viskas = value.docs[0].data();
    // console.log("viskas ===", viskas);
    let numer = Number(viskas.created) + 1;

    const docRef = doc(db, "users", userDocId);
    updateDoc(docRef, { created: numer });
  }

  //const docRef = doc(db, "users");
  //const [value, loading, error] = useDocument(docRef);

  //   useEffect(() => {
  //     if (value) {
  //       console.log("value ===", value);
  //     }
  //   }, [value]);

  function addNewShop(newQuiz) {
    // console.log("newQuiz ===", newQuiz);
    addCreating();
    const shopRef = collection(db, "quiz");
    addDoc(shopRef, newQuiz).then(() => {
      // console.log("prideta!");
      toast.success("You added new Quiz!");
      //navigate("/quiz");
    });
    navigate("/quiz");
  }
  // console.log('Document written with ID: ', docRef.id);
  // navigate('/posts');

  return (
    <div className="mt-20 box-border max-sm:mt-10">
      <h1 className="text-5xl mb-20 max-sm:text-3xl max-sm:mb-10">Active Quiz List</h1>

      <div className="flex flex-col items-center">
        <div className="flex flex-col items-center px-4 pt-2 pb-5 w-full mb-10 bg-black text-white rounded-lg max-sm:mb-5 max-sm:px-1">
          <p className="text-center text-qxl pb-1 max-sm:pb-0">Please fill the new quiz form</p>
          <div className="font-cursive text-black pt-6 pb-3 px-5 max-sm:pt-2 max-sm:pb-1 max-sm:px-2">
            <QuizForm addQuiz={addNewShop} />
          </div>
        </div>
      </div>
    </div>
  );
}
export default AddQuizPage;
