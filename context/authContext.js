"use client";
import { clearCookies } from "@/utils/verifyToken";
import { createContext, useEffect, useReducer, useState } from "react";

const INITIAL_STATE = {
  user:
    (typeof window !== "undefined" &&
      JSON.parse(localStorage.getItem("userInfo"))) ||
    null,
  loading: false,
  error: null,
};

const AuthReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN_START":
      return {
        user: null,
        loading: true,
        error: null,
      };
    case "LOGIN_SUCCESS":
      return {
        user: action.payload,
        loading: false,
        error: null,
      };
    case "LOGIN_FAILURE":
      return {
        user: null,
        loading: false,
        error: action.payload,
      };
    case "LOGOUT":
      return {
        user: null,
        loading: false,
        error: null,
      };
    default:
      return state;
  }
};

const AuthContext = createContext(INITIAL_STATE);

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);
  const [openNavBar, setOpenNavBar] = useState(true);

  const handleLogOut = async () => {
    try {
      localStorage.removeItem("userInfo");
      clearCookies();
      dispatch({ type: "LOGOUT" });
      window.location = "/login";
    } catch (error) {
      console.log(error);
    }
  };
  const hanldeOpenNav = () => {
    setOpenNavBar(!openNavBar);
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("userInfo", JSON.stringify(state.user));
    }
  }, [state.user]);

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        loading: state.loading,
        error: state.error,
        openNavBar,
        dispatch,
        handleLogOut,
        hanldeOpenNav,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
