import React, { useContext, useState } from "react";
import { createContext } from "react";
import { auth } from "../firebase/firebase";
import { useAuthState } from "react-firebase-hooks/auth";

const AuthContext = createContext({
  user: {},
  isLoggedIn: false,
});

function AuthProvider({ children }) {
  const [user, userLoading, userError] = useAuthState(auth);

  const isLoggedIn = !!user;

  const authCtx = {
    user,
    isLoggedIn,
  };

  return <AuthContext.Provider value={authCtx}>{children}</AuthContext.Provider>;
}

export default AuthProvider;

export function useAuthCtx() {
  return useContext(AuthContext);
}
