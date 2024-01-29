const rain = require("../assets/rain.jpg");
const clear = require("../assets/clear.jpg");
const clouds = require("../assets/clouds.jpg");
const mist = require("../assets/mist.jpg");
const def = require("../assets/def.jpg");
const snow = require("../assets/snow.jpg");

const backgroundChanger = (weather: string) => {
  let bgPic: string;

  switch (weather) {
    case "Rain":
      bgPic = rain;
      break;

    case "Clear":
      bgPic = clear;
      break;

    case "Clouds":
      bgPic = clouds;
      break;

    case "Mist":
      bgPic = mist;
      break;

    case "Snow":
      bgPic = snow;
      break;

    default:
      bgPic = def;
  }
  return bgPic;
};
export default backgroundChanger;
