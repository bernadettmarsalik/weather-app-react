import React from "react";
import { WiHumidity } from "react-icons/wi";
import { SiWindicss } from "react-icons/si";
import iconChanger from "../utils/iconChanger";
import WeatherDataProps from "../utils/WeatherDataProps";

interface WeatherAreaProps {
  weatherData: WeatherDataProps;
}

const WeatherArea: React.FC<WeatherAreaProps> = ({ weatherData }) => (
  <div className="weatherArea my-1">
    <div
      className="badge bg-transparent p-3 mb-3 rounded-5 shadow w-100"
      style={{ backdropFilter: "blur(10px)" }}
    >
      <h2 className="fs-1 mb-3">{weatherData.name}</h2>
      <span className="fs-4 mb-3">{weatherData.sys.country}</span>
    </div>
    <div className="container bg-light rounded-5 shadow p-3">
      <div className="icon">{iconChanger(weatherData.weather[0].main)}</div>
      <h2 className="mb-3">{Math.round(weatherData.main.temp)} °C</h2>
      <h3 className="mb-3">{weatherData.weather[0].main}</h3>
    </div>
    <div className="bottomInfoArea container rounded-5 d-flex flex-wrap justify-content-around mt-3 p-3 bg-light shadow">
      <div className="humidity p-2">
        <WiHumidity className="weatherIcon" />
        <div className="weatherInfo">
          <h3>{weatherData.main.humidity}%</h3>
          <p>humidity</p>
        </div>
      </div>

      <div className="wind p-2">
        <SiWindicss className="weatherIcon" />
        <div className="weatherInfo">
          <h3>{weatherData.wind.speed} km/h</h3>
          <p>wind speed</p>
        </div>
      </div>
    </div>
  </div>
);

export default WeatherArea;
