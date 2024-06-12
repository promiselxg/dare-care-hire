"use client";
const INITIAL_STATE = {
  user: null,
  loading: false,
  error: null,
};

if (typeof window !== "undefined") {
  INITIAL_STATE.user = JSON.parse(localStorage.getItem("userInfo"));
}

export default INITIAL_STATE;
