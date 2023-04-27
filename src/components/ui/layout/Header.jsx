import React from "react";
import { Link, NavLink } from "react-router-dom";
import logo from "/src/assets/images/logo_black.svg";
import login from "/src/assets/images/icon_login.svg";
import toRight from "/src/assets/images/toright.svg";
import toLeft from "/src/assets/images/toleft.svg";

function Header() {
  return (
    <header className="bg-background container mx-auto max-w-5xl flex justify-between items-center">
      <Link to="/">
        <img src={logo} alt="Logo" />
      </Link>
      <nav className="bg-yellow border border-black rounded-full flex items-center">
        <NavLink className="pl-4">Home</NavLink>
        <img className="display-inline-block" src={toLeft} alt="span" />
        <img src={toRight} alt="span" />
        <NavLink className="nav-link">Quiz</NavLink>
        <img src={toLeft} alt="span" />
        <img src={toRight} alt="span" />
        <NavLink className="">Add Quiz</NavLink>
        <img src={toLeft} alt="span" />
        <img src={toRight} alt="span" />
        <NavLink className="">My Quiz</NavLink>
        <img src={toLeft} alt="span" />
        <img src={toRight} alt="span" />
        <NavLink className="pr-4">My Quiz</NavLink>
      </nav>
      <Link className="bg-black text-white p-3 rounded-lg" to="/">
        <img className="bg-neutral-500" src={login} alt="Logo" />
      </Link>
    </header>
  );
}

export default Header;
