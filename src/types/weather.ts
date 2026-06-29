export interface WeatherData {
    name: string;
    main: {
        temp: number;
        humidity: number;
        feels_like: number;
        temp_min: number;
        temp_max: number;
        pressure: number;
    };

    weather: Array<{
        description: string;
        icon: string;
        main: string;
    }>;

    wind: {
        speed: number;
        deg: number;
    };

    coord: {
        lat: number;
        lon: number;
    };

    sys: {
        country: string;
        sunrise: number;
        sunset: number;
    };
    dt: number;
}

export interface ForecastData {
    list: Array<{
        dt: number;
        main: {
            temp: number;
            humidity: number;
            feels_like: number;
            temp_min: number;
            temp_max: number;
        };
        weather: Array<{
            description: string;
            icon: string;
            main: string;
        }>;
        wind: {
            speed: number;
        };
        dt_txt: string;
    }>;

    city: {
        name: string;
        country: string;
    };
}

export interface WeatherError {
    message: string;
    cod?: string;
}