import React from "react";
import hero from "/src/assets/images/bighero.svg";
import quiz from "/src/assets/images/totalApl.svg";

function HomePage() {
  return (
    <div className="container flex justify-around items-center mx-auto mt-10 max-w-5xl flex-row">
      <h1 className="bg-black p-5 text-6xl text-white leading-normal mt-5 mb-5 text-center w-2/5 ">Welcome to the greatest Quiz application</h1>
      <img className="w-1/3" src={hero} alt="hero" />
    </div>
  );
}

export default HomePage;
