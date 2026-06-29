import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';//استایل های پیشفرض
// import L from 'leaflet';

interface WeatherMapProps {
    lat: number;
    lon: number;
    cityName: string;
    temperature: number;
}

const WeatherMap: React.FC<WeatherMapProps> = ({ lat, lon, cityName, temperature }) => {
    return (
        <div className="rounded-xl overflow-hidden shadow-lg h-[200px] w-full">
            <MapContainer
                center={[lat, lon]}
                zoom={11}
                style={{ height: '100%', width: '100%' }}
                zoomControl={false}
            >
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                <Marker position={[lat, lon]}>
                    <Popup>
                        <div className="text-center">
                            <span className="text-lg block">{cityName}
                            </span>

                            <span className="text-md text-blue-600 dark:text-blue-400">
                                {Math.round(temperature)}°C
                            </span>
                        </div>
                    </Popup>
                </Marker>
            </MapContainer>
        </div>
    );
};

export default WeatherMap;