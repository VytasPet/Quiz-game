import { useFormik } from "formik";
import React from "react";
import { Link } from "react-router-dom";
import * as Yup from "yup";

function RegisterPage() {
  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string().email().required("Required"),
    password: Yup.string().required("Required"),
  });

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log(values);
    },
  });

  return (
    <div className="mt-20 box-border">
      <h1 className="text-5xl mb-20">Register</h1>

      <div className="flex flex-col items-center">
        <div className="flex flex-col items-center px-4 pt-2 pb-5 w-80 max-w-1/3 mb-10 bg-black text-white rounded-lg">
          <div className="font-cursive text-white underline pt-3 pb-3 px-5"></div>
          <form onSubmit={formik.handleSubmit} className="bg-yellow space-y-4 space-b-10 rounded-lg p-5">
            <label htmlFor="email" className="block text-black text-sm font-medium">
              Email:
            </label>
            <input
              id="email"
              name="email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
              placeholder="Your email"
              type="text"
              className="mt-1 w-full py-2 px-3 border text-black border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:border-indigo-500 sm:text-sm"
            />
            {formik.errors.email && formik.touched.email && <p className="text-red text-sm">{formik.errors.email}</p>}
            <label htmlFor="email" className="block text-black text-sm font-medium">
              Password:
            </label>
            <input
              id="password"
              name="password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
              placeholder="Your email"
              type="password"
              className="mt-1 w-full py-2 px-3 border border-gray-300 bg-white text-black rounded-md shadow-sm focus:outline-none focus:border-indigo-500 sm:text-sm"
            />
            {formik.errors.password && formik.touched.password && <p className="text-red text-sm">{formik.errors.password}</p>}
            <button type="submit" className="bg-black mt-10 text-white  py-2 px-4 rounded hover:bg-background hover:text-black hover:outline ">
              Register
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;
