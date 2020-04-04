import React from "react";
import logo from "../../../hourglass.png";
import "./header.css";

const Header = (props) => {
  return (
    <header>
      <h1 className="app-brand">Clockwork</h1>
      <img
        className={props.timerStarted ? "app-logo" : ""}
        height="25"
        src={logo}
        alt="clockwork"
      />
    </header>
  );
};

export default Header;
