import React from "react";
import { Link } from "@reach/router";
import { Button } from "antd";

import NetflixLogo from "../icons/NetflixLogo";
import "../../images/netflix-logo.png";
import { CloudUploadOutlined } from "@ant-design/icons";
import "./header.css";

const Header = () => {
  return (
    <header className="header">
      <div id="logo" className="logo">
        <Link to="/">
          <NetflixLogo />
        </Link>
      </div>
      <div className="upload-icon">
        <Link to="/upload">
          <Button
            type="primary"
            shape="circle"
            icon={<CloudUploadOutlined />}
          />
        </Link>
      </div>
    </header>
  );
};

export default Header;
