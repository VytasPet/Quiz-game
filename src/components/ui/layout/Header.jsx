import React from "react";
import { Link, NavLink } from "react-router-dom";
import logo from "/src/assets/images/logo_black.svg";
import login from "/src/assets/images/icon_login.svg";
import toRightEmpty from "/src/assets/images/empty-nav-toright.svg";
import toLeftEmpty from "/src/assets/images/empty-nav-toleft.svg";
import toRight from "/src/assets/images/toright.svg";
import toLeft from "/src/assets/images/toleft.svg";

function Header() {
  return (
    <header className="bg-background container mx-auto max-w-5xl flex justify-between items-center .right-arrow">
      <Link to="/">
        <img src={logo} alt="Logo" />
      </Link>
      <nav className="bg-yellow border border-black rounded-full flex items-center">
        <div className="bg-background flex border border-tr rounded-full hover:bg-yellow items-center">
          <NavLink className="pl-4">Home</NavLink>
          <img className="display-inline-block left-arrow-home-empty" src={toLeftEmpty} alt="span" />
          <img className="display-inline-block left-arrow-home" src={toLeft} alt="span" />
        </div>

        <div className="bg-background flex border border-tr rounded-full hover:bg-yellow items-center">
          <img className="display-inline-block right-arrow-myquiz-empty" src={toRightEmpty} alt="span" />
          <img className="display-inline-block right-arrow-myquiz" src={toRight} alt="span" />
          <NavLink className="nav-link">Quiz</NavLink>
          <img className="display-inline-block left-arrow-myquiz" src={toLeft} alt="span" />
          <img className="display-inline-block left-arrow-myquiz-empty" src={toLeftEmpty} alt="span" />
        </div>

        <div className="bg-background flex border border-tr rounded-full hover:bg-yellow items-center">
          <img className="display-inline-block right-arrow-myquiz-empty" src={toRightEmpty} alt="span" />
          <img className="display-inline-block right-arrow-myquiz" src={toRight} alt="span" />
          <NavLink className="nav-link">Add Quiz</NavLink>
          <img className="display-inline-block left-arrow-myquiz" src={toLeft} alt="span" />
          <img className="display-inline-block left-arrow-myquiz-empty" src={toLeftEmpty} alt="span" />
        </div>

        <div className="bg-background flex border border-tr rounded-full hover:bg-yellow items-center">
          <img className="display-inline-block right-arrow-myquiz-empty" src={toRightEmpty} alt="span" />
          <img className="display-inline-block right-arrow-myquiz" src={toRight} alt="span" />
          <NavLink className="nav-link">My Quiz</NavLink>
          <img className="display-inline-block left-arrow-myquiz" src={toLeft} alt="span" />
          <img className="display-inline-block left-arrow-myquiz-empty" src={toLeftEmpty} alt="span" />
        </div>

        <div className="bg-background flex border border-tr rounded-full hover:bg-yellow items-center">
          <img className="display-inline-block right-arrow-profile-empty" src={toRightEmpty} alt="span" />
          <img className="display-inline-block right-arrow-profile" src={toRight} alt="span" />
          <NavLink className="pl-4">Profile</NavLink>
        </div>
      </nav>

      <Link className="bg-yellow border border-black text-white p-1 rounded-full" to="/">
        <img className="bg-neutral-500" src={login} alt="Logo" />
      </Link>
    </header>
  );
}

export default Header;
