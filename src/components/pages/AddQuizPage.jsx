import { addDoc, collection } from "firebase/firestore";
import React from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../../firebase/firebase";
import QuizForm from "../forms/QuizForm";
import toast from "react-hot-toast";
import { useAuthCtx } from "../../store/AuthProvider";

function AddQuizPage() {
  const navigate = useNavigate();

  function addNewShop(newQuiz) {
    console.log("newQuiz ===", newQuiz);
    const shopRef = collection(db, "quiz");
    addDoc(shopRef, newQuiz).then(() => {
      console.log("prideta!");
      toast.success("You added new Quiz!");
      //navigate("/quiz");
    });
  }
  // console.log('Document written with ID: ', docRef.id);
  // navigate('/posts');

  return (
    <div className="mt-20 box-border">
      <h1 className="text-5xl mb-20">Active Quiz List</h1>

      <div className="flex flex-col items-center">
        <div className="flex flex-col items-center px-4 pt-2 pb-5 w-full mb-10 bg-black text-white rounded-lg">
          <p className="text-center text-qxl pb-1">Please fill the new quiz form</p>
          <div className="font-cursive text-black pt-6 pb-3 px-5">
            <QuizForm addQuiz={addNewShop} />
          </div>
        </div>
      </div>
    </div>
  );
}
export default AddQuizPage;
