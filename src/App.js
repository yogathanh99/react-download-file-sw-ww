import React from "react";
import { Router } from "@reach/router";

import Home from "./pages/home";
import UploadPage from "./pages/upload-page";
import "./styles/style.css";

class App extends React.Component {
  render() {
    return (
      <Router>
        <Home path="/" />
        <UploadPage path="/upload" />
      </Router>
    );
  }
}

export default App;
