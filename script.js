const searchBox = document.getElementById('search-box');
const searchBtn = document.getElementById('search-btn');
const currentWeatherContainer = document.querySelector('.current-weather-container');
const weatherIcon = document.getElementById('weather-icon');
const temp = document.getElementById('temp');
const description = document.getElementById('description');
const humidity = document.getElementById('humidity');
const windSpeed = document.getElementById('wind-speed');
const forecastCardsContainer = document.querySelector('.forecast-cards-container');

const apiKey = e69c11b8902a8e00941508b75deadc52;

// Function to fetch weather data for the given location
async function getWeatherData(location) {
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${apiKey}`;
  const response = await fetch(apiUrl);
  const data = await response.json();
  return data;
}

// Function to fetch forecast data for the given location
async function getForecastData(location) {
  const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${location}&units=metric&appid=${apiKey}`;
  const response = await fetch(apiUrl);
  const data = await response.json();
  return data;
}

// Function to update the UI with weather data
function updateWeatherUI(data) {
  const iconUrl = `http://openweathermap.org/img/w/${data.weather[0].icon}.png`;
  weatherIcon.setAttribute('src', iconUrl);
  temp.textContent = data.main.temp.toFixed(1);
  description.textContent = data.weather[0].description;
  humidity.textContent = data.main.humidity;
  windSpeed.textContent = data.wind.speed;
  currentWeatherContainer.style.display = 'block';
}

// Function to update the UI with forecast data
function updateForecastUI(data) {
  const forecastData = data.list.filter((item, index) => index % 8 === 0);
  forecastCardsContainer.innerHTML = '';
  forecastData.forEach((item) => {
    const card = document.createElement('div');
    card.classList.add('forecast-card');
    card.innerHTML = `
      <p>${new Date(item.dt * 1000).toLocaleDateString()}</p>
      <img src="http://openweathermap.org/img/w/${item.weather[0].icon}.png" alt="Weather Icon">
      <p>${item.main.temp.toFixed(1)}°C</p>
    `;
    forecastCardsContainer.appendChild(card);
  });
}

// Function to handle search button click
async function handleSearch() {
  const location = searchBox.value.trim();
  if (location) {
    try {
      const weatherData = await getWeatherData(location);
      const forecastData = await getForecastData(location);
      updateWeatherUI(weatherData);
      updateForecastUI(forecastData);
    } catch (error) {
      console.error(error);
      alert('An error occurred while fetching data');
    }
  }
}

// Add event listener for search button click
searchBtn.addEventListener('click', handleSearch);
