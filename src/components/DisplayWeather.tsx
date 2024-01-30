import { useCallback, useEffect, useState } from "react";
import WeatherDataProps from "../utils/WeatherDataProps";
import { GrSearch } from "react-icons/gr";
import { GrLocation } from "react-icons/gr";
import axios from "axios";
import backgroundChanger from "../utils/backgroundChanger";
import DefaultMessage from "./DefaultMessage";
import Loading from "./Loading";
import WeatherArea from "./WeatherArea";

const DisplayWeather = () => {
  // api data
  const api_key = "94d42ce148641d5fd173f0d463e06fc0";
  const api_Endpoint = "https://api.openweathermap.org/data/2.5/";

  // constants
  const [geolocationError, setGeolocationError] = useState<string | null>(null);
  const [weatherData, setWeatherData] = useState<WeatherDataProps | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [searchCity, setsearchCity] = useState<string>("");
  const [showWeather, setShowWeather] = useState(false);

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

  // render bg
  const renderBackground = (weather: string) => {
    return backgroundChanger(weather);
  };

  // get location
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        fetchCurrentWeather(latitude, longitude)
          .then((currentWeather) => {
            setWeatherData(currentWeather);
            setIsLoading(true);
          })
          .catch((error: Error) => {
            setGeolocationError(error.message);
          });
      },
      (error) => {
        setGeolocationError(
          "Error getting geolocation. Please try again or enter a city manually."
        );
      }
    );
  }, []);

  // geolocation handle
  const handleGeoLocationClick = () => {
    setGeolocationError(null); // Reset geolocationError before attempting to fetch geolocation data
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        fetchCurrentWeather(latitude, longitude)
          .then((currentWeather) => {
            setWeatherData(currentWeather);
            setIsLoading(true);
            setShowWeather(true);
          })
          .catch((error) => {
            setGeolocationError((error as Error).message);
          });
      },
      (error) => {
        setGeolocationError(
          "Error getting geolocation. Please try again or enter a city manually."
        );
      }
    );
  };

  // search handle
  const handleSearch = async () => {
    setGeolocationError(null);
    if (searchCity.trim() === "") {
      return;
    }
    try {
      const { currentWeatherData } = await fetchWeatherData(searchCity);
      setWeatherData(currentWeatherData);
      setIsLoading(true);
      setShowWeather(true);
    } catch (error) {
      setGeolocationError((error as Error).message);
    }
  };

  return (
    <div className="app-wrapper container-fluid mt-3">
      <div
        className="container shadow text-center p-3 rounded-5"
        style={{
          backgroundImage: `url(${
            weatherData && isLoading && !geolocationError && showWeather
              ? renderBackground(weatherData.weather[0].main)
              : renderBackground("")
          })`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="searchArea d-flex justify-content-between align-items-start">
          <input
            type="text"
            placeholder="Enter a city"
            className="form-control rounded rounded-pill me-3 bg-light"
            value={searchCity}
            onChange={(event) => setsearchCity(event.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSearch();
            }}
          />
          <div className="searchCircle me-3">
            <GrSearch
              className="searchIcon btn btn-lg border rounded-circle border-2 p-1 fs-1 bg-light"
              onClick={handleSearch}
            />
            <p className="text-white mt-2">Search city</p>
          </div>
          <div className="geoCircle">
            <GrLocation
              className="searchIcon btn btn-lg border rounded-circle border-2 p-1 fs-1 bg-light"
              onClick={handleGeoLocationClick}
            />
            <p className="text-white mt-2">Locate me</p>
          </div>
        </div>

        {geolocationError ? (
          <div className="error-message my-3">
            <div
              className="bg-transparent p-3 mb-3 rounded-5 shadow w-100 fs-4 text-light"
              style={{
                backdropFilter: "blur(10px)",
                height: "150px",
              }}
            >
              <p>{geolocationError}</p>
            </div>
          </div>
        ) : showWeather && weatherData && isLoading ? (
          <WeatherArea weatherData={weatherData} />
        ) : showWeather && isLoading ? (
          <Loading />
        ) : (
          <DefaultMessage />
        )}
      </div>
    </div>
  );
};
export default DisplayWeather;
