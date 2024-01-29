import { useCallback, useEffect, useState } from "react";
import WeatherDataProps from "../utils/WeatherDataProps";
import { AiOutlineSearch } from "react-icons/ai";
import { WiHumidity } from "react-icons/wi";
import { SiWindicss } from "react-icons/si";
import { RiLoaderFill } from "react-icons/ri";
import axios from "axios";
import iconChanger from "../utils/iconChanger";
import backgroundChanger from "../utils/backgroundChanger";

const DisplayWeather = () => {
  // api data
  const api_key = "94d42ce148641d5fd173f0d463e06fc0";
  const api_Endpoint = "https://api.openweathermap.org/data/2.5/";

  // fetch current weather
  const fetchCurrentWeather = useCallback(
    async (lat: number, lon: number) => {
      const url = `${api_Endpoint}weather?lat=${lat}&lon=${lon}&appid=${api_key}&units=metric`;
      const response = await axios.get(url);
      return response.data;
    },
    [api_Endpoint, api_key]
  );

  // fetch input weather
  const fetchWeatherData = async (city: string) => {
    try {
      const url = `${api_Endpoint}weather?q=${city}&appid=${api_key}&units=metric`;
      const searchResponse = await axios.get(url);

      const currentWeatherData: WeatherDataProps = searchResponse.data;
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
      const { currentWeatherData } = await fetchWeatherData(searchCity);
      setWeatherData(currentWeatherData);
    } catch (error) {}
  };

  //  weather data
  const [weatherData, setWeatherData] = useState<WeatherDataProps | null>(null);

  // loading
  const [isLoading, setIsLoading] = useState(false);

  // search city
  const [searchCity, setsearchCity] = useState<string>("");

  // location
  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;
      Promise.all([fetchCurrentWeather(latitude, longitude)]).then(
        ([currentWeather]) => {
          setWeatherData(currentWeather);
          setIsLoading(true);
        }
      );
    });
  }, []);

  // icon changer
  const renderWeatherIcon = (weather: string) => {
    return iconChanger(weather);
  };

  // background changer
  const renderBackground = (weather: string) => {
    return backgroundChanger(weather);
  };
  return (
    <div className="app-wrapper container-fluid mt-3">
      <div
        className="container shadow text-center p-4 rounded-5"
        style={{
          backgroundImage: `url(${
            weatherData && isLoading
              ? renderBackground(weatherData.weather[0].main)
              : ""
          })`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="searchArea d-flex justify-content-between align-items-center">
          <input
            type="text"
            placeholder="Enter a city"
            className="form-control rounded rounded-pill me-3 bg-light"
            value={searchCity}
            onChange={(event) => setsearchCity(event.target.value)}
          />
          <div className="searchCircle">
            <AiOutlineSearch
              className="searchIcon btn btn-lg border rounded-circle border-2 p-1 fs-1 bg-light"
              onClick={handleSearch}
            />
          </div>
        </div>

        {weatherData && isLoading ? (
          <div className="weatherArea my-1 p-3">
            <div
              className="badge bg-transparent p-3 mb-3 rounded-5 shadow w-100"
              style={{ backdropFilter: "blur(8px)" }}
            >
              <h1 className="fs-1 mb-3">{weatherData.name}</h1>
              <span className="fs-4 mb-5 mb-3">{weatherData.sys.country}</span>
            </div>
            <div className="container bg-light rounded-5 p-3 shadow">
              <div className="icon mb-2 ">
                {renderWeatherIcon(weatherData.weather[0].main)}{" "}
              </div>
              <h1 className="mb-3">{Math.round(weatherData.main.temp)} °C</h1>
              <h2 className="mb-3">{weatherData.weather[0].main}</h2>
            </div>
            <div className="bottomInfoArea container rounded-5 d-flex flex-wrap justify-content-around mt-3 p-3 bg-light shadow">
              <div className="humidity p-2">
                <WiHumidity className="weatherIcon" />
                <div className="weatherInfo">
                  <h1>{weatherData.main.humidity}%</h1>
                  <p>humidity</p>
                </div>
              </div>

              <div className="wind p-2">
                <SiWindicss className="weatherIcon" />
                <div className="weatherInfo">
                  <h1>{weatherData.wind.speed} km/h</h1>
                  <p>wind speed</p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="loading my-3">
            <RiLoaderFill className="loadingIcon" />
            <p>loading...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DisplayWeather;
