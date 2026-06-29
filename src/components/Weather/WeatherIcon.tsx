import React from 'react';

interface WeatherIconProps {
    icon: string;
    description: string;
    size?: 'small' | 'medium' | 'large';
}

const WeatherIcon: React.FC<WeatherIconProps> = ({ icon, description, size = 'medium' }) => {
    const sizeMap = {
        small: 'w-8 h-8',
        medium: 'w-16 h-16',
        large: 'w-24 h-24'
    };

    return (
        <img
            src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
            alt={description}
            className={`${sizeMap[size]} object-contain`}
        />
    );
};

export default WeatherIcon;