import { signInWithEmailAndPassword } from "firebase/auth";
import React from "react";
import { Link } from "react-router-dom";

import LoginForm from "../forms/LoginForm";

function LoginPage() {
  function loginWithFirebaseHook({ email, password }) {
    const loadingToastId = toast.loading("Signing in...");
    signInWithEmailAndPassword(email, password).then(() => {
      toast.dismiss(loadingToastId);
    });
  }

  return (
    <div className="mt-20 box-border">
      <h1 className="text-5xl mb-20">Login</h1>

      <div className="flex flex-col items-center">
        <div className="flex flex-col items-center px-4 pt-2 pb-5 w-80 max-w-1/3 mb-10 bg-black text-white rounded-lg">
          <div className="font-cursive text-white underline pt-3 pb-3 px-5">
            <Link to={"/register"}>Maybe you want to register?</Link>
          </div>
          <LoginForm onLog={loginWithFirebaseHook} />
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
