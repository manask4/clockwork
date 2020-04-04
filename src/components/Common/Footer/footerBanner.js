import React from "react";
import "./footerBanner.css";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const FooterBanner = (props) => {
  return (
    <div className="footer-banner">
      <small>
        This app uses your browser local storage to store your data and function
        properly.
      </small>
      <small onClick={props.togglBanner} className="footer-banner-close">
        Got it! <FontAwesomeIcon icon={faCheckCircle} />
      </small>
    </div>
  );
};

export default FooterBanner;
