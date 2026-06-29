import { useState } from 'react';
import { type WeatherData, type ForecastData } from '../types/weather';
import { fetchWeather, fetchForecast } from '../services/weatherApi';

export function useWeather() {
    const [weather, setWeather] = useState<WeatherData | null>(null);
    const [forecast, setForecast] = useState<ForecastData | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const searchCity = async (city: string) => {
        setLoading(true);
        setError(null);
        try {
            const [weatherData, forecastData] = await Promise.all([
                fetchWeather(city),
                fetchForecast(city)
            ]);
            setWeather(weatherData);
            setForecast(forecastData);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'شهر مورد نظر یافت نشد');
            setWeather(null);
            setForecast(null);
        } finally {
            setLoading(false);
        }
    };

    return {
        weather,
        forecast,
        loading,
        error,
        searchCity
    };
}