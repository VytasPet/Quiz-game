import React, { useEffect } from "react";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { auth, db } from "../../firebase/firebaseConfig";
import RegisterForm from "../forms/RegisterForm";
import { collection, doc, setDoc } from "firebase/firestore";

function RegisterPage() {
  const navigate = useNavigate();
  const [createUserWithEmailAndPassword, user, loading, error] = useCreateUserWithEmailAndPassword(auth);

  function registrationFireBaseHook({ email, password }) {
    const loadingToastId = toast.loading("Registering...");
    createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        console.log("userCredential ===", userCredential.user);
        const user = userCredential.user;
        const userDocRef = doc(db, "users", user.uid);

        const info = {
          completed: 0,
          created: 0,
          result: [],
          email: user.email,
          userUid: user.uid,
        };

        setDoc(userDocRef, info);
        toast.dismiss(loadingToastId);
        toast.success("register completed!");
        navigate("/quiz");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        toast.dismiss(loadingToastId);
        console.warn("errorMessage ===", errorMessage);
      });
  }

  useEffect(() => {
    if (error) {
      console.log(error);
      toast.error(`Failed to register! ${error.message}`);
    }
  }, [error]);

  return (
    <div className="mt-20 box-border max-sm:mt-10">
      <h1 className="text-5xl mb-20 max-sm:text-2xl max-sm:mb-10">Register</h1>

      <div className="flex flex-col items-center">
        <div className="flex flex-col items-center px-4 pt-2 pb-5 w-80 max-w-1/3 mb-10 bg-black text-white rounded-lg">
          <div className="font-cursive text-white underline pt-3 pb-3 px-5"></div>
          <RegisterForm onReg={registrationFireBaseHook} />
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;
