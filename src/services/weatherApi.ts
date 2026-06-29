import { type WeatherData, type ForecastData, type WeatherError } from '../types/weather';

const API_KEY = 'ad0ee1ecbc5c740b8e43e93b0769b752'; // کلید API
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

export async function fetchWeather(city: string): Promise<WeatherData> {
    const response = await fetch(
        `${BASE_URL}/weather?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`
    );

    if (!response.ok) {
        const error: WeatherError = await response.json();
        throw new Error(error.message || 'City not found');
    }

    return response.json();
}

export async function fetchForecast(city: string): Promise<ForecastData> {
    const response = await fetch(
        `${BASE_URL}/forecast?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`
    );

    if (!response.ok) {
        const error: WeatherError = await response.json();
        throw new Error(error.message || 'City not found');
    }

    return response.json();
}