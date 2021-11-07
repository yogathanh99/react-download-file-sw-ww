import React from "react";
import NetflixBackgroundImage from "../../images/netflix-background.jpg";
import NarcosLogo from "../../images/narcos.logo.png";

const Hero = () => {
  return (
    <div id="hero" className="hero">
      <div className="content">
        <img className="logo" src={NarcosLogo} />
        <h2>Season 2 now available</h2>
        <div className="button-wrapper">
          <a href="#" className="button-el" style={{ background: "red" }}>
            Watch now
          </a>
        </div>
      </div>
      <div
        className="overlay"
        style={{ background: `url(${NetflixBackgroundImage})` }}
      />
    </div>
  );
};

export default Hero;
