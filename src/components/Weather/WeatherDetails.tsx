import React from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { type WeatherData } from '../../types/weather';

interface WeatherDetailsProps {
    data: WeatherData;
}

const WeatherDetails: React.FC<WeatherDetailsProps> = ({ data }) => {
    const { t } = useLanguage();

    const details = [
        {
            key: 'windSpeed',
            label: t('weather.windSpeed'),
            value: `${data.wind.speed} m/s`,
            icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
            ),
            color: 'blue',
        },

        {
            key: 'humidity',
            label: t('weather.humidity'),
            value: `${data.main.humidity}%`,
            icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
                </svg>
            ),
            color: 'cyan',
        },
        {
            key: 'feelsLike',
            label: t('weather.feelsLike'),
            value: `${Math.round(data.main.feels_like)}°C`,
            icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            ),
            color: 'yellow',
        },
    ];

    return (
        <div className="grid grid-cols-3 gap-3 mt-4">
            {details.map((item) => (
                <div
                    key={item.key}
                    className="bg-white/50 dark:bg-gray-700/50 backdrop-blur-sm rounded-xl p-3 text-center transition-all duration-300 hover:bg-white/70 dark:hover:bg-gray-700/70 hover:shadow-lg hover:-translate-y-1"
                >
                    <div className={`flex justify-center mb-1 text-${item.color}-500 dark:text-${item.color}-400`}>
                        {item.icon}
                    </div>
                    <p className="text-gray-600 text-xs font-medium dark:text-gray-400 mb-1">
                        {item.label}
                    </p>
                    <p className="font-semibold text-gray-800 dark:text-white">
                        {item.value}
                    </p>
                </div>
            ))}
        </div>
    );
};

export default WeatherDetails;