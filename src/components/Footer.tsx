import React from "react";
import { FaGithub } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";

const Footer = () => {
  const openWeather = require("../assets/openweather.png");

  return (
    <div>
      <footer
        className="text-center text-dark d-flex flex-xxl-row flex-xl-row flex-lg-row flex-md-column flex-sm-column
 justify-content-center bg-transparent"
      >
        <div>
          <strong>Current Weather App </strong> by Bernadett Marsalik
          <span>
            <a
              className="fs-3 mx-3 link-secondary"
              href="https://github.com/bernadettmarsalik/"
              target="_blank"
              rel="noreferrer"
            >
              <FaGithub />
            </a>
            <a
              className="fs-3 link-secondary"
              href="https://linkedin.com/in/bernadett-marsalik-511506287/"
              target="_blank"
              rel="noreferrer"
            >
              <FaLinkedin />
            </a>
          </span>
        </div>
        <div>
          <img
            alt="Open Weather Logo"
            style={{ width: 100 }}
            src={String(openWeather)}
          />
          <span>
            Weather data provided by{" "}
            <a
              className="text-decoration-none link-secondary"
              href="https://openweathermap.org/"
              target="_blank"
              rel="noreferrer"
            >
              OpenWeather
            </a>
          </span>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
