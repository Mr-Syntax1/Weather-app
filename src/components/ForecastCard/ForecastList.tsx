import React, { useMemo } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { type ForecastData } from '../../types/weather';
import ForecastCard from './ForecastCard';

interface ForecastListProps {
    data: ForecastData;
}

const ForecastList: React.FC<ForecastListProps> = ({ data }) => {
    const { t } = useLanguage();

    // گرفتن پیش‌بینی‌های روزانه با دمای واقعی
    const dailyForecasts = useMemo(() => {
        const days: Record<string, any> = {};

        // گروه‌بندی بر اساس روز
        data.list.forEach(item => {
            const dateKey = new Date(item.dt_txt).toDateString();

            if (!days[dateKey]) {
                days[dateKey] = {
                    items: [],//برای ذخیره پیش بینی ها
                    tempMin: Infinity,//(شروع با بینهایت)
                    tempMax: -Infinity,//(شروع با منفی بینهایت)
                    dt: item.dt,
                    icon: item.weather[0].icon,
                    description: item.weather[0].description,
                };
            }

            const day = days[dateKey];
            day.items.push(item);
            day.tempMin = Math.min(day.tempMin, item.main.temp_min);
            day.tempMax = Math.max(day.tempMax, item.main.temp_max);
        });

        // تبدیل به آرایه و نشان دادن
        return Object.values(days)
            .slice(0, 6) // گرفتن ۶ روز
            .map((day: any) => ({
                dt: day.dt,
                tempMin: day.tempMin,
                tempMax: day.tempMax,
                icon: day.icon,
                description: day.description,
            }));

    }, [data]);

    return (
        <div className="mt-6 group">
            <h3 className="text-xl font-bold text-gray-300 dark:text-white mb-5 flex items-center gap-2">
                <span className="text-2xl">📅</span>
                {t('weather.forecast')}
            </h3>

            <div className="grid mx-auto w-full grid-cols-2 sm:grid-cols-3 md:flex md:justify-center gap-3">
                {dailyForecasts.map((item) => (
                    <ForecastCard
                        key={item.dt}
                        dt={item.dt}
                        tempMin={item.tempMin}
                        tempMax={item.tempMax}
                        icon={item.icon}
                        description={item.description}
                    />
                ))}
            </div>
        </div>
    );
};

export default ForecastList;