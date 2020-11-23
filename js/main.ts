/**
 * Input field
 * displays weather data very nicely
 * animations?
 * I want the background to change based on that city
 */

/**
  * base: "stations"
clouds: {all: 1}
cod: 200
coord: {lon: -74.01, lat: 40.71}
dt: 1606165852
id: 5128581
main:
feels_like: 37.09
humidity: 45
pressure: 1016
temp: 46
temp_max: 48.2
temp_min: 43
__proto__: Object
name: "New York"
sys: {type: 1, id: 5141, country: "US", sunrise: 1606132370, sunset: 1606167165}
timezone: -18000
visibility: 10000
weather: [{…}]
wind: {speed: 8.05, deg: 310, gust: 19.46}
__proto__: Object
  */

import getCityWeatherInfo from "./openWeatherMapCityName";

const createInfoContainer = (
  cityName: string,
  temperatureValue: string,
  feelsLikeValue: string,
  highValue: string,
  lowvalue: string,
  humidityValue: string
): HTMLDivElement => {
  const container = document.createElement("div");
  const name = document.createElement("div");
  const temperature = document.createElement("div");
  const high = document.createElement("div");
  const low = document.createElement("div");
  const humidity = document.createElement("div");
  const feelslLike = document.createElement("div");
  name.innerText = cityName;
  temperature.innerText = temperatureValue;
  high.innerText = highValue;
  low.innerText = lowvalue;
  humidity.innerText = humidityValue;
  feelslLike.innerText = feelsLikeValue;

  container.append(name, temperature, feelslLike, high, low, humidity);
  return container;
};
const createErrorContainer = (someText: string): HTMLDivElement => {
  const errorContainer = document.createElement("div");
  errorContainer.innerText = someText;
  return errorContainer;
};

const clear = (div: HTMLDivElement) => {
  while (div.firstChild) {
    div.removeChild(div.firstChild);
  }
};

(() => {
  window.addEventListener("load", () => {
    const getDataButton = document.getElementById("get-data-button");
    const cityInput = document.getElementById("city-input");
    const display = document.getElementById("display");

    getDataButton.addEventListener("click", async () => {
      const response = await getCityWeatherInfo(
        (cityInput as HTMLInputElement).value
      );
      let info: HTMLDivElement;
      if (response) {
        const { main, name } = response;
        console.log(main);
        const { feels_like, temp, humidity, temp_max, temp_min } = main;
        info = createInfoContainer(
          name,
          temp,
          feels_like,
          temp_max,
          temp_min,
          humidity
        );
      } else {
        info = createErrorContainer("There was an error");
      }

      clear(display as HTMLDivElement);
      display.appendChild(info);
    });
  });
})();
