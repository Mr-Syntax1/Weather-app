import React from 'react';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from 'recharts';

import { useLanguage } from '../../contexts/LanguageContext';
import { type ForecastData } from '../../types/weather';

interface TemperatureChartProps {
    data: ForecastData;
}

const TemperatureChart: React.FC<TemperatureChartProps> = ({ data }) => {
    const { language } = useLanguage();

    //پیش‌بینی‌های ۳ ساعته
    //۲۴ × ۳ ساعت = ۷۲ ساعت = ۳ روز
    const chartData = data.list.slice(0, 24).map((item) => ({
        time: new Date(item.dt * 1000).toLocaleTimeString(language === 'fa' ? 'fa-IR' : 'en-US', {
            hour: '2-digit',
            minute: '2-digit',
        }),

        temp: Math.round(item.main.temp),
        feelsLike: Math.round(item.main.feels_like),
    }));

    return (
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-lg  flex justify-center items-center flex-col">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4 text-center">
                {language === 'fa' ? '📈 تغییرات دما' : '📈 Temperature Changes'}
            </h3>

            <div className="w-full h-[250px] text-gray-500 pr-14">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={chartData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                        <XAxis dataKey="time" tick={{ fontSize: 12 }} />
                        <YAxis tick={{ fontSize: 12 }} />
                        <Tooltip />
                        <Legend />
                        <Line
                            type="monotone"
                            dataKey="temp"
                            stroke="#3b82f6"
                            strokeWidth={2}
                            name={language === 'fa' ? 'دما' : 'Temperature'}
                            fontSize={'16px'}
                            dot={{ r: 3 }}
                        />
                        <Line
                            type="monotone"
                            dataKey="feelsLike"
                            stroke="#8b5cf6"
                            strokeWidth={2}
                            name={language === 'fa' ? 'دمای احساسی' : 'Feels Like'}
                            dot={{ r: 3 }}
                            strokeDasharray="5 5"
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default TemperatureChart;