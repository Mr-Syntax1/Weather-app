const apikey = "ad0ee1ecbc5c740b8e43e93b0769b752";
const MIN_LOADING_TIME = 4000;

const weatherDataEl = document.querySelector("#weather-data");
const cityInputEl = document.querySelector("#cityInput");
const formEl = document.querySelector("form");
const descEl = weatherDataEl.querySelector(".description");

// صفحه تار + لودر
const loaderEl = document.getElementById("loaderOverlay");

formEl.addEventListener("submit", (event) => {
  event.preventDefault(); //  (ریفرش صفحه رو انجام نده) 
  const cityValue = cityInputEl.value.trim(); //فاصله‌های اضافی اول و آخر رو حذف می‌کنه
  getWeatherData(cityValue);
  cityInputEl.value = "";
});

async function getWeatherData(cityValue) {
  // زمان شروع لودینگ
  const startTime = Date.now();

  try {
    // reset UI
    descEl.classList.remove("error");
    descEl.textContent = "";

    // پاکسازی پیش‌بینی‌های قبلی
    const forecastContainer = document.getElementById("forecast-container");
    forecastContainer.innerHTML = "";

    // نمایش loader
    loaderEl.classList.remove("hidden");

    // دریافت داده‌ها به صورت موازی
    const [currentResponse, forecastResponse] = await Promise.all([
      fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&appid=${apikey}&units=metric&lang=fa`),
      fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${cityValue}&appid=${apikey}&units=metric&lang=fa`)
    ]);

    if (!currentResponse.ok || !forecastResponse.ok) throw new Error();

    const [currentData, forecastData] = await Promise.all([
      currentResponse.json(),
      forecastResponse.json()
    ]);

    // محاسبه زمان باقی‌مانده تا 4 ثانیه
    const elapsedTime = Date.now() - startTime;
    const remainingTime = Math.max(0, MIN_LOADING_TIME - elapsedTime);

    // منتظر ماندن برای تکمیل 4 ثانیه
    await new Promise(resolve => setTimeout(resolve, remainingTime));

    // مخفی کردن loader
    loaderEl.classList.add("hidden");

    // نمایش داده‌های فعلی
    const temperature = Math.round(currentData.main.temp);//به دست اوردن عدد دمای صحیح
    const description = currentData.weather[0].description;
    const icon = currentData.weather[0].icon;


    document.querySelector("h1").textContent = currentData.name;

    weatherDataEl.querySelector(".icon").innerHTML =
      `<img src="https://openweathermap.org/img/wn/${icon}@2x.png">`;

    weatherDataEl.querySelector(".temperature").textContent =
      `${temperature}°C`;

    descEl.textContent = description;

    weatherDataEl.querySelector(".details").innerHTML = `
      <div>🌡️ دمای احساسی: ${Math.round(currentData.main.feels_like)}°C</div>
      <div>💧 رطوبت: ${currentData.main.humidity}%</div>
      <div>💨 سرعت باد: ${currentData.wind.speed} m/s</div>
    `;

    updateWeeklyForecast(forecastData);

  } catch (error) {
    // بررسی زمان سپری شده در صورت خطا
    const elapsedTime = Date.now() - startTime;
    const remainingTime = Math.max(0, MIN_LOADING_TIME - elapsedTime);

    await new Promise(resolve => setTimeout(resolve, remainingTime));

    loaderEl.classList.add("hidden");

    // پاکسازی UI در صورت خطا
    weatherDataEl.querySelector(".icon").innerHTML = "";
    weatherDataEl.querySelector(".temperature").textContent = "";
    weatherDataEl.querySelector(".details").innerHTML = "";

    descEl.classList.add("error");
    descEl.textContent = " شهر پیدا نشد یا مشکلی رخ داد";

    // پاکسازی پیش‌بینی‌ها در صورت خطا
    const forecastContainer = document.getElementById("forecast-container");
    forecastContainer.innerHTML = "";

    console.error("Error fetching weather data:", error);
  }
}

function updateWeeklyForecast(forecastData) {
  const container = document.getElementById("forecast-container");
  container.innerHTML = "";

  const dailyData = {};

  forecastData.list.forEach(item => {
    const date = new Date(item.dt * 1000);
    const dayKey = date.toLocaleDateString("fa-IR", { weekday: "short" });

    if (!dailyData[dayKey]) {
      dailyData[dayKey] = {
        min: item.main.temp_min,
        max: item.main.temp_max,
        icon: item.weather[0].icon,
        desc: item.weather[0].description
      };
    } else {
      dailyData[dayKey].min = Math.min(dailyData[dayKey].min, item.main.temp_min);
      dailyData[dayKey].max = Math.max(dailyData[dayKey].max, item.main.temp_max);
    }
  });

  Object.entries(dailyData).slice(0, 7).forEach(([day, data]) => {
    const card = document.createElement("div");
    card.className = "forecast-card";
    card.innerHTML = `
      <div class="day">${day}</div>
      <img src="https://openweathermap.org/img/wn/${data.icon}@2x.png">
      <div class="temp">${Math.round(data.max)}° / ${Math.round(data.min)}°</div>
      <div class="desc">${data.desc}</div>
    `;
    container.appendChild(card);
  });
}
