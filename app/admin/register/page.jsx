"use client";
import React, { useState } from "react";
import axios from "axios";
import ROLES from "@/utils/roles";
const Page = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    confirm_password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const formRecord = {
    ...formData,
    roles: [ROLES.user, ROLES.admin],
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { data } = await axios.post("/api/auth/register", formRecord);
    console.log(data?.message);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="username"
        value={formData.username}
        onChange={handleChange}
        className="border border-red-500 p-3"
      />
      <input
        type="password"
        name="password"
        value={formData.password}
        onChange={handleChange}
        className="border border-red-500 p-3"
      />
      <input
        type="password"
        name="confirm_password"
        value={formData.confirm_password}
        onChange={handleChange}
        className="border border-red-500 p-3"
      />

      <button type="submit" className="border bg-green-500 p-3 rounded-md">
        Register
      </button>
    </form>
  );
};

export default Page;
