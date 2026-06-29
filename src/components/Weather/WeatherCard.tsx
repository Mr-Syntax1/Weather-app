import React from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { type WeatherData } from '../../types/weather';
import WeatherIcon from './WeatherIcon';
import Temperature from './Temperature';
import WeatherDetails from './WeatherDetails';

interface WeatherCardProps {
    data: WeatherData;
}

const WeatherCard: React.FC<WeatherCardProps> = ({ data }) => {
    const { t } = useLanguage();

    // ترجمه وضعیت آب‌وهوا
    const getTranslatedDescription = (desc: string): string => {
        const key = `weather.conditions.${desc}`;
        const translated = t(key);
        return translated === key ? desc : translated;
    };

    return (
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
            <div className="text-center">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                    {data.name}
                </h2>
                <p className="text-gray-500 dark:text-gray-400 text-sm">
                    {getTranslatedDescription(data.weather[0].description)}
                </p>
            </div>

            <div className="flex items-center justify-center gap-4 my-4">
                <WeatherIcon
                    icon={data.weather[0].icon}
                    description={getTranslatedDescription(data.weather[0].description)}
                    size="large"
                />
                <Temperature temp={data.main.temp} />
            </div>

            <WeatherDetails data={data} />
        </div>
    );
};

export default WeatherCard;