import React from "react";
import QuizForm from "../forms/QuizForm";

function AddQuizPage() {
  return (
    <div className="mt-20 box-border">
      <h1 className="text-5xl mb-20">Active Quiz List</h1>

      <div className="flex flex-col items-center">
        <div className="flex flex-col items-center px-4 pt-2 pb-5 w-full mb-10 bg-black text-white rounded-lg">
          <p className="text-center text-qxl pb-1">Please fill the new quiz form</p>
          <div className="font-cursive text-black pt-6 pb-3 px-5">
            <QuizForm />
          </div>
        </div>
      </div>
    </div>
  );
}
export default AddQuizPage;
