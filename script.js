// ✅ Replace with your own API key
const apiKey = "8a1a3eb78c9b51a282e2d4f45d330564";

const searchBtn = document.getElementById("searchBtn");
const cityInput = document.getElementById("cityInput");

const weatherCard = document.getElementById("weatherCard");
const cityName = document.getElementById("cityName");
const dateEl = document.getElementById("date");
const temperature = document.getElementById("temperature");
const description = document.getElementById("description");
const humidity = document.getElementById("humidity");
const wind = document.getElementById("wind");
const weatherIcon = document.getElementById("weatherIcon");
const errorEl = document.getElementById("error");

// 📅 Format the date
function formatDate() {
  const today = new Date();
  return today.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

// 🌦 Fetch Weather Data
async function getWeather(city) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error("City not found");

    const data = await response.json();

    // ✅ Update UI
    cityName.textContent = `${data.name}, ${data.sys.country}`;
    dateEl.textContent = formatDate();
    temperature.textContent = `${Math.round(data.main.temp)}°C`;
    description.textContent = data.weather[0].description;
    humidity.textContent = data.main.humidity;
    wind.textContent = data.wind.speed;

    // Weather icon
    const iconCode = data.weather[0].icon;
    weatherIcon.src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

    weatherCard.classList.remove("hidden");
    errorEl.classList.add("hidden");

    // Change background
    setBackground(data.weather[0].main);
  } catch (error) {
    weatherCard.classList.add("hidden");
    errorEl.classList.remove("hidden");
  }
}

// 🎨 Background changes
function setBackground(weather) {
  let bg;
  switch (weather.toLowerCase()) {
    case "clear":
      bg = "linear-gradient(135deg, #f7971e, #ffd200)";
      break;
    case "clouds":
      bg = "linear-gradient(135deg, #757f9a, #d7dde8)";
      break;
    case "rain":
      bg = "linear-gradient(135deg, #000046, #1cb5e0)";
      break;
    case "snow":
      bg = "linear-gradient(135deg, #83a4d4, #b6fbff)";
      break;
    case "thunderstorm":
      bg = "linear-gradient(135deg, #200122, #6f0000)";
      break;
    default:
      bg = "linear-gradient(135deg, #1e3c72, #2a5298)";
  }
  document.body.style.background = bg;
}

// 🔍 Search button click
searchBtn.addEventListener("click", () => {
  const city = cityInput.value.trim();
  if (city !== "") getWeather(city);
});

// ⌨️ Enter key support
cityInput.addEventListener("keyup", (e) => {
  if (e.key === "Enter") searchBtn.click();
});
