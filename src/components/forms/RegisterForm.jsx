import { useFormik } from "formik";
import React from "react";
import * as Yup from "yup";

function RegisterForm({ onReg }) {
  const initialValues = {
    email: "",
    username: "",
    password: "",
  };

  const validationSchema = Yup.object({
    username: Yup.string().required("Required"),
    email: Yup.string().email().required("Required"),
    password: Yup.string().required("Required"),
  });

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: (values) => {
      // console.log(values);
      onReg(values);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className="bg-yellow last:mt-[25px] w-64 rounded-lg py-5">
<label htmlFor="username" className="block text-left text-grey text-[13px] mb-3 font-medium">Username</label>

<div className="relative mb-7">
  <img src="src/assets/images/personusername.svg" alt="" className="absolute left-4 top-[50%] transform -translate-y-1/2" />
  <input
    id="username"
    name="username"
    onChange={formik.handleChange}
    onBlur={formik.handleBlur}
    value={formik.values.username}
    placeholder="Enter your username"
    type="text"
    className="mt-1 pl-[50px] w-full py-4 px-3 text-[14px] text-black bg-lightGray rounded-[20px] shadow-sm focus:outline-none sm:text-sm"
  />
</div>
{formik.errors.username && formik.touched.username && <p className="text-red text-sm">{formik.errors.username}</p>}

<label htmlFor="email" className="block text-left text-grey text-[13px] mb-3 font-medium">Email</label>

<div className="relative mb-7">
  <img src="src/assets/images/mailemail.svg" alt="" className="absolute left-4 w-[21px] top-[54%] transform -translate-y-1/2" />
  <input
    id="email"
    name="email"
    onChange={formik.handleChange}
    onBlur={formik.handleBlur}
    value={formik.values.email}
    placeholder="Enter your email"
    type="text"
    className="mt-1 pl-[50px] w-full py-4 px-3 text-[14px] text-black bg-lightGray rounded-[20px] shadow-sm focus:outline-none sm:text-sm"
  />
</div>



      {formik.errors.email && formik.touched.email && <p className="text-red text-sm">{formik.errors.email}</p>}


      <label htmlFor="password" className="block text-left text-grey text-[13px] mb-3 font-medium">Password</label>

<div className="relative mb-[55px]">
  <img src="src/assets/images/Unionspyna.svg" alt="" className="absolute pl-2 left-2 top-[50%] transform -translate-y-1/2" />
  <input
    id="password"
    name="password"
    onChange={formik.handleChange}
    onBlur={formik.handleBlur}
    value={formik.values.password}
    placeholder="Enter your password"
    type="text"
    className="mt-1 pl-[50px] w-full py-4 px-3 text-[14px] text-black bg-lightGray rounded-[20px] shadow-sm focus:outline-none sm:text-sm"
  />
</div>
      {formik.errors.password && formik.touched.password && <p className="text-red text-sm">{formik.errors.password}</p>}
      <button type="submit" className="text-white only:mt-[55px] w-full text-[18px] py-[16px] font-medium px-4 bg-blue rounded-[16px]  hover:text-grey ">
        Register
      </button>
    </form>
  );
}

export default RegisterForm;
