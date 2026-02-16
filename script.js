const apikey = "ad0ee1ecbc5c740b8e43e93b0769b752";
const MIN_LOADING_TIME = 4000;
let map;
let marker;


const weatherDataEl = document.querySelector("#weather-data");
const cityInputEl = document.querySelector("#cityInput");
const formEl = document.querySelector("form");
const descEl = weatherDataEl.querySelector(".description");

// صفحه تار + لودر
const loaderEl = document.getElementById("loaderOverlay");

formEl.addEventListener("submit", (event) => {
  event.preventDefault();
  const cityValue = cityInputEl.value.trim();
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

    // دریافت داده‌ها به صورت همزمان
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
      <div>🌡️ دمای احساسی: <span dir="ltr">${Math.round(currentData.main.feels_like)}°C </span></div>
      <div>💧 رطوبت: ${currentData.main.humidity}%</div>
      <div>💨 سرعت باد: ${currentData.wind.speed} m/s</div>
    `;

    // گرفتن مختصات از داده فعلی برای نقشه
    const lat = currentData.coord.lat;
    const lon = currentData.coord.lon;

    // نمایش روی نقشه
    showCityOnMap(lat, lon, currentData.name, temperature, currentData.main.humidity);

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

// تابع نمایش شهر روی نقشه
function showCityOnMap(lat, lon, cityName, temperature, humidity) {

  document.getElementById("map").classList.remove("hidden");

  const popupContent = `
    📍 <b>${cityName}</b><br>
    💧 رطوبت: ${humidity}% <br>
    🌡️ دما: ${temperature}°C <br>
  `;

  if (!map) {
    // داخل دیو یک نقشه بساز
    map = L.map("map").setView([lat, lon], 10);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "© OpenStreetMap contributors"
    }).addTo(map);

    marker = L.marker([lat, lon]).addTo(map);

  } else {
    map.setView([lat, lon], 10);
    marker.setLatLng([lat, lon]);
  }

  marker.bindPopup(popupContent).openPopup();
}


// تابع به‌روزرسانی پیش‌بینی هفتگی
function updateWeeklyForecast(forecastData) {

  const container = document.getElementById("forecast-container");

  container.innerHTML = "";

  const dailyData = {};

  // حلقه روی لیست پیش‌بینی‌های ۳ ساعته‌ی API
  forecastData.list.forEach(item => {

    // تبدیل timestamp به تاریخ قابل استفاده
    const date = new Date(item.dt * 1000);


    const dayKey = date.toLocaleDateString("fa-IR", { weekday: "short" });

    // اگر این روز برای اولین بار دیده شده باشد
    if (!dailyData[dayKey]) {

      dailyData[dayKey] = {
        min: item.main.temp_min,
        max: item.main.temp_max,
        icon: item.weather[0].icon,
        desc: item.weather[0].description
      };

    } else {
      // اگر این روز قبلاً ثبت شده باشد
      // به‌روزرسانی min و max واقعی کل روز
      dailyData[dayKey].min = Math.min(
        dailyData[dayKey].min,
        item.main.temp_min
      );

      dailyData[dayKey].max = Math.max(
        dailyData[dayKey].max,
        item.main.temp_max
      );
    }
  });

  // تبدیل آبجکت روزها به آرایه و نمایش حداکثر ۷ روز
  Object.entries(dailyData)
    .slice(0, 7)
    .forEach(([day, data]) => {

      const card = document.createElement("div");
      card.className = "forecast-card";

      card.innerHTML = `
        <div class="day">${day}</div>

        <!-- آیکن وضعیت هوا -->
        <img src="https://openweathermap.org/img/wn/${data.icon}@2x.png">

        <!-- نمایش min و max دما -->
        <div class="temp">
          <span dir="ltr">
            ${Math.round(data.min)}° / ${Math.round(data.max)}°
          </span>
        </div>

        <!-- توضیح وضعیت هوا -->
        <div class="desc">${data.desc}</div>
      `;

      // اضافه کردن کارت به کانتینر اصلی
      container.appendChild(card);
    });
}
