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
        // console.log("userCredential ===", userCredential.user);
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
        // console.warn("errorMessage ===", errorMessage);
      });
  }

  useEffect(() => {
    if (error) {
      // console.log(error);
      toast.error(`Failed to register! ${error.message}`);
    }
  }, [error]);

  return (
    <div className="mt-20 box-border max-sm:mt-10">
      {/* <h1 className="text-5xl mb-20 text-white max-sm:text-2xl max-sm:mb-10">Register</h1> */}

      <div className="flex flex-col items-center">
        <div className="flex flex-col items-center px-6 py-10 max-w-1/2 mb-10 bg-white text-grey rounded-[16px]">
          <div className="font-cursive text-white underline pt-3 pb-3 px-5"></div>
          <img className="absolute top-[30px] max-sm:top-0 z-0"  src="src/assets/images/reglog.svg" alt="" />
          <div className="w-full bg-lightBlue rounded-[16px] p-1 flex justify-between">
          <Link to={'/login'} className="px-[45px] text-blue py-[13px] max-w-full rounded-[16px] z-10">Login</Link>
          <Link to={'/register'} className="px-[45px] py-[13px] max-w-full rounded-[16px] bg-blue text-white z-10">Register</Link>
        </div>
          <RegisterForm onReg={registrationFireBaseHook} />
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;
