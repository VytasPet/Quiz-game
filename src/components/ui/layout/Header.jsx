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
    <header className=" container mx-auto max-w-5xl flex justify-between items-center .right-arrow">
      <Link to="/">
        <img src={logo} alt="Logo" />
      </Link>
    <Link className="bg-white font-bold py-4 px-6 rounded-[16px] cursor-pointer" to={"/register"}>Sign up</Link>
    </header>
  );
}

export default Header;
