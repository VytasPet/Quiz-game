// import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useFormik } from "formik";
import React from "react";
import * as Yup from "yup";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function LoginForm({ onLog }) {
  const navigate = useNavigate();

  const initialValues = {
    email: "jonas@mekas.com",
    password: "123123",
  };

  const validationSchema = Yup.object({
    email: Yup.string().email().required("Required"),
    password: Yup.string().required("Required"),
  });

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: (values) => {
      // console.log(values);
      onLog(values);
    },
  });

  // function loginWithGmail() {
  //   const loginGooglePromise = signInWithPopup(auth, googleProvider)
  //     .then((result) => {
  //       console.log("result ===", result);
  //       // This gives you a Google Access Token. You can use it to access the Google API.
  //       const credential = GoogleAuthProvider.credentialFromResult(result);
  //       const token = credential.accessToken;
  //       // The signed-in user info.
  //       const user = result.user;
  //       // IdP data available using getAdditionalUserInfo(result)
  //       // ...
  //       console.log("user ===", user);
  //       navigate("/shops");
  //     })
  //     .catch((error) => {
  //       // Handle Errors here.
  //       console.log("error ===", error);
  //       const errorCode = error.code;
  //       const errorMessage = error.message;
  //       console.warn("errorMessage ===", errorMessage);
  //       // The email of the user's account used.
  //       const email = error.customData.email;
  //       // The AuthCredential type that was used.
  //       const credential = GoogleAuthProvider.credentialFromError(error);
  //       // ...
  //     });
  //   toast.promise(loginGooglePromise, {
  //     loading: "Loading",
  //     success: "Login success",
  //     error: "Error when loging in",
  //   });
  // }

  return (


    <form onSubmit={formik.handleSubmit} className="bg-yellow last:mt-[25px] w-64 rounded-lg py-5">
<label htmlFor="username" className="block text-left text-grey text-[13px] mb-3 font-medium">Email</label>

<div className="relative mb-7">
  <img src="src/assets/images/personusername.svg" alt="" className="absolute left-4 top-[50%] transform -translate-y-1/2" />
  <input
 id="email"
 name="email"
 onChange={formik.handleChange}
 onBlur={formik.handleBlur}
 value={formik.values.email}
 placeholder="Your email"
 type="text"
    className="mt-1 pl-[50px] w-full py-4 px-3 text-[14px] text-black bg-lightGray rounded-[20px] shadow-sm focus:outline-none sm:text-sm"
  />
</div>
{formik.errors.email && formik.touched.email && <p className="text-red text-sm">{formik.errors.email}</p>}

<label htmlFor="email" className="block text-left text-grey text-[13px] mb-3 font-medium">Password</label>

<div className="relative mb-7">
  <img src="src/assets/images/mailemail.svg" alt="" className="absolute left-4 w-[21px] top-[54%] transform -translate-y-1/2" />
  <input
   id="password"
   name="password"
   onChange={formik.handleChange}
   onBlur={formik.handleBlur}
   value={formik.values.password}
   placeholder="Your password"
   type="password"
    className="mt-1 pl-[50px] w-full py-4 px-3 text-[14px] text-black bg-lightGray rounded-[20px] shadow-sm focus:outline-none sm:text-sm"
  />
</div>



      {formik.errors.password && formik.touched.password && <p className="text-red text-sm">{formik.errors.password}</p>}


      <button type="submit" className="text-white only:mt-[55px] w-full text-[18px] py-[16px] font-medium px-4 bg-blue rounded-[16px]  hover:text-grey ">
        Login
      </button>
    </form>



  
  );
}

export default LoginForm;

// <form onSubmit={formik.handleSubmit} className="bg-yellow space-y-4 space-b-10 rounded-lg p-5">
// <label htmlFor="email" className="block text-black text-sm font-medium">
//   Email:
// </label>
// <input
//   id="email"
//   name="email"
//   onChange={formik.handleChange}
//   onBlur={formik.handleBlur}
//   value={formik.values.email}
//   placeholder="Your email"
//   type="text"
//   className="mt-1 w-full py-2 px-3 border text-black border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:border-indigo-500 sm:text-sm"
// />
// {formik.errors.email && formik.touched.email && <p className="text-red text-sm">{formik.errors.email}</p>}
// <label htmlFor="email" className="block text-black text-sm font-medium">
//   Password:
// </label>
// <input
//   id="password"
//   name="password"
//   onChange={formik.handleChange}
//   onBlur={formik.handleBlur}
//   value={formik.values.password}
//   placeholder="Your email"
//   type="password"
//   className="mt-1 w-full py-2 px-3 border border-gray-300 bg-white text-black rounded-md shadow-sm focus:outline-none focus:border-indigo-500 sm:text-sm"
// />
// {formik.errors.password && formik.touched.password && <p className="text-red text-sm">{formik.errors.password}</p>}
// <button type="submit" className="bg-black mt-10 text-white  py-2 px-4 rounded hover:bg-background hover:text-black hover:outline ">
//   Login
// </button>
// </form>