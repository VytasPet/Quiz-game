import React from "react";

function Profile() {
  return (
    <div className="mt-20 box-border flex flex-col items-center bg-grey space-y-4 space-b-10 rounded-lg p-5">
      <h1 className="text-5xl mb-10">Your Statistic</h1>
      <p className="border-y py-2 w-1/2">Created Quiz: 5</p>
      <p className="border-y py-2 w-1/2">Quiz Completed: 3</p>
      <p className="border-y py-2 w-1/2">Average result: 86%</p>
    </div>
  );
}

export default Profile;
