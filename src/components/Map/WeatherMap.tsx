import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// تنظیم آیکون پیش‌فرض
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
    iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
    iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

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
                            <span className="text-lg block">{cityName}</span>
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
