import React from "react";
import "./button.css";

const Button = (props) => {
  return (
    <button
      className={`${props.classNames} ${props.isActive ? "active" : ""}`}
      onClick={props.handleClick}
      name={props.name.toLowerCase()}
    >
      {props.name}
    </button>
  );
};

export default Button;
