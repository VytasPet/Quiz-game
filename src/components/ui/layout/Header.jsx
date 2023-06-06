import React from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { useSignOut } from "react-firebase-hooks/auth";
import logo from "/src/assets/images/logo_black.svg";
import login from "/src/assets/images/icon_login.svg";
import toRightEmpty from "/src/assets/images/empty-nav-toright.svg";
import toLeftEmpty from "/src/assets/images/empty-nav-toleft.svg";
import toRight from "/src/assets/images/toright.svg";
import toLeft from "/src/assets/images/toleft.svg";
import { useAuthCtx } from "../../../store/AuthProvider";
import { auth } from "../../../firebase/firebaseConfig";
import toast from "react-hot-toast";
import { useState } from "react";
import menu from "/src/assets/images/menu-svgrepo-com.svg";
import homeU from "/src/assets/images/homehom.svg";
import union from "/src/assets/images/Unionreward.svg";
import explorer from "/src/assets/images/button-explorequizes.svg";
import editD from "/src/assets/images/edit-2created.svg";
import personP from "/src/assets/images/personprof.svg";
import vector from "/src/assets/images/Vectoruser.svg";

function Header() {
  const [signOut, loading, error] = useSignOut(auth);
  const { user, isLoggedIn } = useAuthCtx();
  const navigate = useNavigate();
  const [menuOn, setmenuOn] = useState(false);
  const location = useLocation();
  console.log("location ===", location);

  function menuOpener() {
    setmenuOn(!menuOn);
  }

  function signOutHandle() {
    signOut();
    setmenuOn(false);
    navigate("/");
    toast.success("You just logged out!");
  }

  return (
    <div className={`mx-auto ${location.pathname === "/leaderBoard" ? "bg-blue" : "bg-[#FAFAFA]"} sticky top-0 z-50`}>
      <header className=" px-[55px] py-[10px] pt-[20px] rounded-b-[30px] bg-lightBlue max-sm:px-[20px]">
        <div className="mx-auto bg-lightBlue max-w-5xl w-full flex justify-between items-center">
          <Link className="bg-white font-bold py-4 px-6 max-sm:py-2 max-sm:px-3 rounded-[16px] cursor-pointer hover:outline hover:outline-black" to={isLoggedIn ? "/userhome" : "/"}>
            {" "}
            <img src={homeU} alt="" />{" "}
          </Link>
          {isLoggedIn && (
            <Link className="bg-white font-bold py-4 px-6 max-sm:py-2 max-sm:px-3 rounded-[16px] cursor-pointer hover:outline hover:outline-black" to={"/leaderBoard"}>
              {" "}
              <img src={union} alt="" />{" "}
            </Link>
          )}
          <Link to={`${isLoggedIn ? "/userhome" : "/login"}`}>
            <img className="w-[90px] max-sm:w-[60px]" src={explorer} alt="Logo" />
          </Link>

          {isLoggedIn && (
            <Link className="bg-white font-bold py-4 px-6 max-sm:py-2 max-sm:px-3 rounded-[16px] cursor-pointer hover:outline hover:outline-black" to={"/addquiz"}>
              {" "}
              <img src={editD} alt="" />{" "}
            </Link>
          )}
          {isLoggedIn && (
            <Link className="bg-white font-bold py-4 px-6 max-sm:py-2 max-sm:px-3 rounded-[16px] cursor-pointer hover:outline hover:outline-black" to={"/profile"}>
              {" "}
              <img src={personP} alt="" />{" "}
            </Link>
          )}
          {!isLoggedIn && (
            <Link className="bg-white font-bold py-4 px-6 max-sm:py-2 max-sm:px-3 rounded-[16px] cursor-pointer hover:outline hover:outline-black" to={"/login"}>
              {" "}
              <img src={vector} alt="" />{" "}
            </Link>
          )}
        </div>
      </header>
    </div>
  );
}

export default Header;
