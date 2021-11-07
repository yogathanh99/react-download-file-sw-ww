import React from "react";
import { Link } from "@reach/router";

import NetflixLogo from "../icons/NetflixLogo";
import "../../images/netflix-logo.png";

const Header = () => {
  return (
    <header className="header">
      <div id="logo" className="logo">
        <Link to="/">
          <NetflixLogo />
        </Link>
      </div>
    </header>
  );
};

export default Header;
