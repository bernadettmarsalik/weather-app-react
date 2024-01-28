import React, { useState } from "react";
import { MainWrapper } from "./styles.module";
import { AiOutlineSearch } from "react-icons/ai";
import { WiHumidity } from "react-icons/wi";
import { SiWindicss } from "react-icons/si";
import {
  BsFillSunFill,
  BsCloudyFill,
  BsFillCloudRainFill,
  BsCloudFog2Fill,
} from "react-icons/bs";
import { RiLoaderFill } from "react-icons/ri";
import { TiWeatherPartlySunny } from "react-icons/ti";
import axios from "axios";

// interface
interface WeatherDataProps {
  name: string;
  main: {
    temp: number;
    humidity: number;
  };
  sys: {
    country: string;
  };
  weather: {
    main: string;
  }[];
  wind: {
    speed: number;
  };
}

const DisplayWeather = () => {
  // api data
  const api_key = "94d42ce148641d5fd173f0d463e06fc0";
  const api_Endpoint = "https://api.openweathermap.org/data/2.5/";

  // fetch current weather
  const fetchCurrentWeather = React.useCallback(
    async (lat: number, lon: number) => {
      const url = `${api_Endpoint}weather?lat=${lat}&lon=${lon}&appid=${api_key}&units=metric`;
      const response = await axios.get(url);
      return response.data;
    },
    [api_Endpoint, api_key]
  );

  // fetch  input weather
  const fetchInputWeather = async (city: string) => {
    try {
      const url = `${api_Endpoint}weather?q=${city}&appid=${api_key}&units=metric`;
      const response = await axios.get(url);

      const currentWeatherData: WeatherDataProps = response.data;
      return { currentWeatherData };
    } catch (error) {
      throw error;
    }
  };

  // handle search
  const handleSearch = async () => {
    if (searchCity.trim() === "") {
      return;
    }

    try {
      const { currentWeatherData } = await fetchInputWeather(searchCity);
      setWeatherData(currentWeatherData);
    } catch (error) {}
  };

  //  weather data
  const [weatherData, setWeatherData] = React.useState<WeatherDataProps | null>(
    null
  );

  // loading
  const [isLoading, setIsLoading] = React.useState(false);

  // search city
  const [searchCity, setsearchCity] = React.useState<string>("");

  // location
  React.useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;
      Promise.all([fetchCurrentWeather(latitude, longitude)]).then(
        ([currentWeather]) => {
          setWeatherData(currentWeather);
          setIsLoading(true);
          console.log(currentWeather);
        }
      );
    });
  });

  // icon changer
  const iconChanger = (weather: string) => {
    let iconElement: React.ReactNode;
    let iconColor: string;

    switch (weather) {
      case "Rain":
        iconElement = <BsFillCloudRainFill />;
        iconColor = "#272829";
        break;

      case "Clear":
        iconElement = <BsFillSunFill />;
        iconColor = "#ffc436";
        break;

      case "Clouds":
        iconElement = <BsCloudyFill />;
        iconColor = "#102c57";
        break;

      case "Mist":
        iconElement = <BsCloudFog2Fill />;
        iconColor = "#279eff";
        break;

      default:
        iconElement = <TiWeatherPartlySunny />;
        iconColor = "#7B2869";
    }
    return (
      <span className="icon" style={{ color: iconColor }}>
        {iconElement}
      </span>
    );
  };

  return (
    <MainWrapper>
      <div className="container">
        <div className="searchArea">
          <input
            type="text"
            placeholder="Enter a city"
            value={searchCity}
            onChange={(event) => setsearchCity(event.target.value)}
          />

          <div className="searchCircle">
            <AiOutlineSearch className="searchIcon" onClick={handleSearch} />
          </div>
        </div>

        {weatherData && isLoading ? (
          <>
            <div className="weatherArea">
              <h1>{weatherData.name}</h1>
              <span>{weatherData.sys.country}</span>
              <div className="icon">
                {iconChanger(weatherData.weather[0].main)}
              </div>
              <h1>{weatherData.main.temp} °C</h1>
              <h2>{weatherData.weather[0].main}</h2>
            </div>
            <div className="bottomInfoArea">
              <div className="humidity">
                <WiHumidity className="weatherIcon" />
                <div className="weatherInfo">
                  <h1>{weatherData.main.humidity}%</h1>
                  <p>humidity</p>
                </div>
              </div>

              <div className="wind">
                <SiWindicss className="weatherIcon" />
                <div className="weatherInfo">
                  <h1>{weatherData.wind.speed} km/h</h1>
                  <p>wind speed</p>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="loading">
            <RiLoaderFill className="loadingIcon" />
            <p>loading...</p>
          </div>
        )}
      </div>
    </MainWrapper>
  );
};

export default DisplayWeather;
