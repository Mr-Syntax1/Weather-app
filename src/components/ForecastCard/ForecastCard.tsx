import React from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import WeatherIcon from '../Weather/WeatherIcon';
import { formatDay } from '../../utils/formatDate';
import { formatTempRange } from '../../utils/formatTemp';

interface ForecastCardProps {
    dt: number;
    tempMin: number;
    tempMax: number;
    icon: string;
    description: string;
}

const ForecastCard: React.FC<ForecastCardProps> = ({
    dt,
    tempMin,
    tempMax,
    icon,
    description
}) => {

    const { language, t } = useLanguage();

    const getTranslatedDescription = (desc: string): string => {
        const key = `weather.conditions.${desc}`;
        const translated = t(key);
        // اگر ترجمه با خود کلید برابر بود، یعنی ترجمه وجود نداره
        return translated === key ? desc : translated;
    };

    return (
        <div className="flex flex-col items-center bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-xl p-5 md:p-8 min-w-[80px] hover:-translate-y-2 transition-all duration-300 hover:shadow-xl hover:bg-white/70 dark:hover:bg-gray-800/70">
            <p className="text-md font-bold text-gray-700 dark:text-gray-300">
                {formatDay(dt, language)}
            </p>

            <WeatherIcon icon={icon} description={description} size="small" />

            <p className="text-xs font-medium text-gray-500 dark:text-gray-400 text-center mb-2">
                {getTranslatedDescription(description)}
            </p>
            <p className="text-sm font-semibold text-gray-800 dark:text-white">
                {formatTempRange(tempMin, tempMax)}
            </p>
        </div>
    );
};

export default ForecastCard;