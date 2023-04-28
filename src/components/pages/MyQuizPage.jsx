import React from "react";
import SingleQuizCard from "../quiz/SingleQuizCard";

function MyQuizPage() {
  return (
    <div className="mt-20 box-border">
      <h1 className="text-5xl mb-20">Active Quiz List</h1>
      <div className="text-left fixed">
        <h2 className="text-2xl mb-3">Filters:</h2>
        <div className="flex flex-col items-start">
          <p className="border p-3 mb-1 rounded-full inline hover:bg-yellow">Sports</p>
          <p className="border p-3 mb-1 rounded-full inline hover:bg-yellow">Geography</p>
          <p className="border p-3 mb-1 rounded-full inline hover:bg-yellow">History</p>
        </div>
      </div>
      <SingleQuizCard />
    </div>
  );
}

export default MyQuizPage;
