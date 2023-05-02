import React from "react";
import { Link } from "react-router-dom";

function SingleQuizCard({ item }) {
  console.log("item ===", item);

  return (
    <Link to={`/quiz/${item?.uid}`} className="flex flex-col items-center">
      <div className="group flex flex-col items-center px-4 pt-2 pb-5 w-2/3 mb-10 bg-black text-white rounded-full">
        <p className=" text-qxl pl-10 pb-1">{item.name.stringValue}</p>
        <div className="bg-yellow font-cursive text-black pt-6 pb-3 px-5 rounded-full w-full hover:bg-background">
          <h2 className="bg-background uppercase text-center p-2 rounded-full inline group-hover:bg-yellow">2023 NBA season statistics</h2>
          <p className="font-cursive my-5">Questions: {item.numQuestions.stringValue}</p>
          <p className="font-sans">Average result: {(item.result.integerValue / item.completed.integerValue).toFixed(2)}%</p>
        </div>
      </div>
    </Link>
  );
}

export default SingleQuizCard;
