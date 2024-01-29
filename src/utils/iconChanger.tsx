import React from "react";
import {
  BsFillSunFill,
  BsCloudyFill,
  BsFillCloudRainFill,
  BsCloudFog2Fill,
  BsSnow,
} from "react-icons/bs";
import { TiWeatherPartlySunny } from "react-icons/ti";

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
      iconColor = "#ffce00";
      break;

    case "Clouds":
      iconElement = <BsCloudyFill />;
      iconColor = "#5b89a4";
      break;

    case "Mist":
      iconElement = <BsCloudFog2Fill />;
      iconColor = "#798386";
      break;

    case "Snow":
      iconElement = <BsSnow />;
      iconColor = "#62929d";
      break;

    default:
      iconElement = <TiWeatherPartlySunny />;
      iconColor = "#ccbd33";
  }

  return (
    <span className="icon" style={{ color: iconColor }}>
      {iconElement}
    </span>
  );
};

export default iconChanger;
