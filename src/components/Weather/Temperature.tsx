import React from 'react';
import { formatTemp } from '../../utils/formatTemp';

interface TemperatureProps {
    temp: number;
}

const Temperature: React.FC<TemperatureProps> = ({ temp }) => {
    return (
        <span className="font-bold text-5xl">
            {formatTemp(temp)}
        </span>
    );
};

export default Temperature;