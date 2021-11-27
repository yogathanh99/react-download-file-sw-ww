import React from "react";
import "./button.css";

const Button = ({ children }) => {
  return (
    <button type="button" className="fill">
      {children}
    </button>
  );
};

export default Button;
