import React from "react";

function QuizsPage() {
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

      <div className="flex flex-col items-center">
        <div className="group flex flex-col items-center px-4 pt-2 pb-5 w-2/3 mb-10 bg-black text-white rounded-full">
          <p className=" text-qxl pl-10 pb-1">Sports Quiz</p>
          <div className="bg-yellow font-cursive text-black pt-6 pb-3 px-5 rounded-full w-full hover:bg-background">
            <h2 className="bg-background uppercase text-center p-2 rounded-full inline group-hover:bg-yellow">2023 NBA season statistics</h2>
            <p className="font-cursive my-5">Questions: 20</p>
            <p className="font-sans">Average result: 88%</p>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center">
        <div className="group flex flex-col items-center px-4 pt-2 pb-5 w-2/3 mb-10 bg-black text-white rounded-full">
          <p className=" text-qxl pl-10 pb-1">Sports Quiz</p>
          <div className="bg-yellow font-cursive text-black pt-6 pb-3 px-5 rounded-full w-full hover:bg-background">
            <h2 className="bg-background uppercase text-center p-2 rounded-full inline group-hover:bg-yellow">2023 NBA season statistics</h2>
            <p className="font-cursive my-5">Questions: 20</p>
            <p className="font-sans">Average result: 88%</p>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center">
        <div className="group flex flex-col items-center px-4 pt-2 pb-5 w-2/3 mb-10 bg-black text-white rounded-full">
          <p className=" text-qxl pl-10 pb-1">Sports Quiz</p>
          <div className="bg-yellow font-cursive text-black pt-6 pb-3 px-5 rounded-full w-full hover:bg-background">
            <h2 className="bg-background uppercase text-center p-2 rounded-full inline group-hover:bg-yellow">2023 NBA season statistics</h2>
            <p className="font-cursive my-5">Questions: 20</p>
            <p className="font-sans">Average result: 88%</p>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center">
        <div className="group flex flex-col items-center px-4 pt-2 pb-5 w-2/3 mb-10 bg-black text-white rounded-full">
          <p className=" text-qxl pl-10 pb-1">Sports Quiz</p>
          <div className="bg-yellow font-cursive text-black pt-6 pb-3 px-5 rounded-full w-full hover:bg-background">
            <h2 className="bg-background uppercase text-center p-2 rounded-full inline group-hover:bg-yellow">2023 NBA season statistics</h2>
            <p className="font-cursive my-5">Questions: 20</p>
            <p className="font-sans">Average result: 88%</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default QuizsPage;
