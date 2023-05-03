import { signInWithEmailAndPassword } from "firebase/auth";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import LoginForm from "../forms/LoginForm";
import { auth } from "../../firebase/fireBase";
import { useAuthCtx } from "../../store/AuthProvider";
import { useEffect } from "react";

function LoginPage() {
  const navigate = useNavigate();
  const { isLoggedIn } = useAuthCtx();

  const [signInWithEmailAndPassword, user, loading, error] = useSignInWithEmailAndPassword(auth);

  function loginWithFirebaseHook({ email, password }) {
    const loadingToastId = toast.loading("Signing in...");
    console.log("email ===", email);
    //const loadingToastId = toast.loading("Signing in...");
    signInWithEmailAndPassword(email, password).then(() => {
      toast.dismiss(loadingToastId);
      console.log("labas");
      //toast.dismiss(loadingToastId);
    });
  }

  useEffect(() => {
    if (user) {
      console.log("isLoggedIn ===", isLoggedIn);
      navigate("/");
      toast.success("Signed in successfully!");
    } else if (error) {
      toast.error(`Failed to sign in: ${error.message}`);
    }
  }, [user, error]);

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
