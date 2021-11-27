import React from "react";
import { Link } from "@reach/router";
import Button from "../components/button";

const Menu = () => {
  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <a style={{ paddingBottom: "10px" }} href="http://localhost:3000/">
        <Button>Web Worker Demo</Button>
      </a>
      <a style={{ paddingBottom: "10px" }} href="http://localhost:3001/">
        <Button>Service Worker Demo</Button>
      </a>
      <Link style={{ paddingBottom: "10px" }} to="/complex">
        <Button>Complex Demo</Button>
      </Link>
    </div>
  );
};

export default Menu;
