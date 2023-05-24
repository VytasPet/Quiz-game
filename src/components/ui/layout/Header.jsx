import React from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
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
import menu from "/src/assets/images/menu-svgrepo-com.svg";
import { useState } from "react";

function Header() {
  const [signOut, loading, error] = useSignOut(auth);
  const { user, isLoggedIn } = useAuthCtx();
  const navigate = useNavigate();
  const [menuOn, setmenuOn] = useState(false);

  function menuOpener() {
    setmenuOn(!menuOn);
  }

  function signOutHandle() {
    toast.success("You just logged out!");
    signOut();
    setmenuOn(false);
    navigate("/");
  }

  return (
    <div className="mx-auto bg-[#FAFAFA]">
    <header className=" px-[55px] py-[10px] rounded-b-[30px] bg-lightBlue">
      <div className="mx-auto bg-lightBlue max-w-5xl w-full flex justify-between items-center">

      
    <Link className="bg-white font-bold py-4 px-6 rounded-[16px] cursor-pointer" to={isLoggedIn ? '/userhome' : '/'}> <img src="src/assets/images/homehom.svg" alt="" /> </Link>
      <Link to="/quiz">
        <img className="w-[90px]" src="src/assets/images/button-explorequizes.svg" alt="Logo" />
      </Link>
      
    {isLoggedIn && <Link className="bg-white font-bold py-4 px-6 rounded-[16px] cursor-pointer" to={"/addquiz"}> <img src="src/assets/images/edit-2created.svg" alt="" /> </Link>}
    {isLoggedIn && <Link className="bg-white font-bold py-4 px-6 rounded-[16px] cursor-pointer" to={"/profile"}> <img src="src/assets/images/personprof.svg" alt="" /> </Link>}
    {!isLoggedIn && <Link className="bg-white font-bold py-4 px-6 rounded-[16px] cursor-pointer" to={"/register"}> <img src="src/assets/images/editsign.svg" alt="" /> </Link>}
    </div>
    </header>
    </div>
  );
}

export default Header;
