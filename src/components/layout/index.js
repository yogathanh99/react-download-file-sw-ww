import React from "react";
import Header from "./header";
import Hero from "./hero";
import "./layout.css";

const Layout = ({ children }) => {
  return (
    <div className="main">
      <Header />
      <Hero />
      <div className="max-w-screen-xl m-auto mt-12">{children}</div>
    </div>
  );
};

export default Layout;
