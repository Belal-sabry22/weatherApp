const apiKeys = "fc41163a3270535cb8bdb46d236b28ba";

const weatherData = document.getElementById("weatherData");
const cityInput = document.getElementById("cityInput");
const formEl = document.querySelector("form");

formEl.addEventListener("submit", (event) => {
  event.preventDefault();
  const cityValue = cityInput.value;
  getWeatherData(cityValue);
});

async function getWeatherData(cityValue) {
  try {
    const response = await fetch(
      `http://api.openweathermap.org/data/2.5/weather?q=${cityValue}&appid=${apiKeys}&units=metric`
    );
    if (!response.ok) {
      throw new Error("Network response was not successful");
    }

    const data = await response.json();
    const temperature = Math.round(data.main.temp);
    const description = data.weather[0].description;
    const icon = data.weather[0].icon;
    const details = [
      `Feels like: ${Math.round(data.main.feels_like)}`,
      `Humidity: ${data.main.humidity}%`,
      `Wind speed: ${data.wind.speed} m/s`,
    ];

    weatherData.querySelector(".icon").innerHTML = `<img src="http://openweathermap.org/img/wn/${icon}.png" alt="weather icon" srcset="">`;
    weatherData.querySelector(".temperature").textContent = `${temperature}°C`;
    weatherData.querySelector(".description").textContent = description;
    weatherData.querySelector(".details").innerHTML = details
      .map((details) => `<div>${details}</div>`)
      .join("");
  } catch (error) {
    weatherData.querySelector(".icon").innerHTML = "";
    weatherData.querySelector(".temperature").textContent = "";
    weatherData.querySelector(".description").textContent =
      "An error occurred. Please enter a valid city name.";
    weatherData.querySelector(".details").innerHTML = "";
  }
}
