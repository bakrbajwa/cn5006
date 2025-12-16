import React from "react";
import './App.css';
import './Calculator.css';

// Functional Button component
const Button = ({ label, ClickHandle }) => {
  return (
    <button
      className="ButtonStyle"
      value={label}
      onClick={ClickHandle}
    >
      {label}
    </button>
  );
};

export default Button;
