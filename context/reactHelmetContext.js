"use client";
import React from "react";
import { HelmetProvider } from "react-helmet-async";
const helmetContext = {};

const ReactHelmetProvider = ({ children }) => {
  return <HelmetProvider context={helmetContext}>{children}</HelmetProvider>;
};

export default ReactHelmetProvider;
