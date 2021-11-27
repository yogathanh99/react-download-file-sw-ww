import React from "react";
import { Router } from "@reach/router";

import Home from "./pages/home";
import UploadPage from "./pages/upload-page";
import Menu from "./pages/menu";
import "./styles/style.css";

class App extends React.Component {
  render() {
    return (
      <Router>
        {/* <Home path="/" /> */}
        <Menu path="/" />
        <UploadPage path="/complex" />
      </Router>
    );
  }
}

export default App;
