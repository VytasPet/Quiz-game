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
import { auth } from "../../../firebase/firebase";
import toast from "react-hot-toast";

function Header() {
  const [signOut, loading, error] = useSignOut(auth);
  const { user, isLoggedIn } = useAuthCtx();
  const navigate = useNavigate();

  function signOutHandle() {
    toast.success("You just logged out!");
    signOut();
    navigate("/");
  }

  return (
    <header className=" container mx-auto max-w-5xl flex justify-between items-center .right-arrow">
      <Link to="/">
        <img src={logo} alt="Logo" />
      </Link>
      <nav className="border border-black rounded-full flex items-center">
        <div className="bg-background flex border-l-0 rounded-full hover:bg-yellow items-center">
          <NavLink to={"/"} className="pl-4">
            Home
          </NavLink>
          <img className="display-inline-block left-arrow-home-empty" src={toLeftEmpty} alt="span" />
          <img className="display-inline-block left-arrow-home" src={toLeft} alt="span" />
        </div>
        {isLoggedIn && (
          <>
            <div className="bg-background flex hover:bg-yellow items-center">
              <img className="display-inline-block right-arrow-myquiz-empty" src={toRightEmpty} alt="span" />
              <img className="display-inline-block right-arrow-myquiz" src={toRight} alt="span" />
              <NavLink to={"/quiz"} className="nav-link">
                Quiz list
              </NavLink>
              <img className="display-inline-block left-arrow-myquiz" src={toLeft} alt="span" />
              <img className="display-inline-block left-arrow-myquiz-empty" src={toLeftEmpty} alt="span" />
            </div>
          </>
        )}
        {!isLoggedIn && (
          <>
            <div className="bg-background flex border-r-0 rounded-full hover:bg-yellow items-center">
              <img className="display-inline-block right-arrow-profile-empty" src={toRightEmpty} alt="span" />
              <img className="display-inline-block right-arrow-profile" src={toRight} alt="span" />
              <NavLink to={"/quiz"} className="pr-4">
                Quiz list
              </NavLink>
            </div>
          </>
        )}
        {isLoggedIn && <></>}

        {isLoggedIn && (
          <>
            <div className="bg-background flex hover:bg-yellow items-center">
              <img className="display-inline-block right-arrow-myquiz-empty" src={toRightEmpty} alt="span" />
              <img className="display-inline-block right-arrow-myquiz" src={toRight} alt="span" />
              <NavLink to={"/addquiz"} className="nav-link">
                Add Quiz
              </NavLink>
              <img className="display-inline-block left-arrow-myquiz" src={toLeft} alt="span" />
              <img className="display-inline-block left-arrow-myquiz-empty" src={toLeftEmpty} alt="span" />
            </div>

            <div className="bg-background flex hover:bg-yellow items-center">
              <img className="display-inline-block right-arrow-myquiz-empty" src={toRightEmpty} alt="span" />
              <img className="display-inline-block right-arrow-myquiz" src={toRight} alt="span" />
              <NavLink to={"/myquiz"} className="nav-link">
                My Quiz
              </NavLink>
              <img className="display-inline-block left-arrow-myquiz" src={toLeft} alt="span" />
              <img className="display-inline-block left-arrow-myquiz-empty" src={toLeftEmpty} alt="span" />
            </div>

            <div className="bg-background flex border-r-0 rounded-full hover:bg-yellow items-center">
              <img className="display-inline-block right-arrow-profile-empty" src={toRightEmpty} alt="span" />
              <img className="display-inline-block right-arrow-profile" src={toRight} alt="span" />
              <NavLink to={"/profile"} className="pr-4">
                Profile
              </NavLink>
            </div>
          </>
        )}

        {/* <div className="bg-background flex border-r-0 rounded-full hover:bg-yellow items-center">
          <img className="display-inline-block right-arrow-profile-empty" src={toRightEmpty} alt="span" />
          <img className="display-inline-block right-arrow-profile" src={toRight} alt="span" />
          <NavLink to={"/register"} className="pr-4">
            Sign Up
          </NavLink>
        </div> */}
      </nav>

      {isLoggedIn && (
        <div className="flex flex-col items-center gap-0">
          <Link onClick={signOutHandle} className="bg-red hover:bg-yellow border border-black text-white p-1 rounded-full">
            <img className="bg-neutral-500" src={login} alt="Logo" />
          </Link>
          {/* <p>{user.email}</p> */}
        </div>
      )}
      {!isLoggedIn && (
        <Link to={"/login"} className="hover:bg-yellow border border-black text-white p-1 rounded-full">
          <img className="bg-neutral-500" src={login} alt="Logo" />
        </Link>
      )}
    </header>
  );
}

export default Header;
