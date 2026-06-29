import { useMemo, useState } from 'react';
import { ThemeProvider } from './contexts/ThemeContext';
import Container from './components/Layout/Container.tsx';
import Header from './components/Layout/Header.tsx';
import Footer from './components/Layout/Footer.tsx';
import SearchBar from './components/Search/SearchBar.tsx';
import WeatherCard from './components/Weather/WeatherCard';
import ForecastList from './components/ForecastCard/ForecastList.tsx';
import WeatherMap from './components/Map/WeatherMap.tsx';
import Spinner from './components/Loading/Spinner.tsx';
import ErrorMessage from './components/Error/ErrorMessage.tsx';
import { useWeather } from './hooks/useWeather.ts';
import SuggestedCities from './components/SuggestedCities/SuggestedCities.tsx'
import { LanguageProvider, useLanguage } from './contexts/LanguageContext.tsx';
import TemperatureChart from './components/TemperatureChart/TemperatureChart.tsx';
import { motion } from 'framer-motion';


function AppContent() {
  const { weather, forecast, loading, error, searchCity } = useWeather();
  const [hasSearched, setHasSearched] = useState(false);
  const { isRTL, language } = useLanguage();

  // شهرهای پیشنهادی با ترجمه
  const suggestions = useMemo(() => {
    const cities = {
      fa: ['تهران', 'تبریز', 'اصفهان', 'شیراز', 'مشهد', 'کرج', 'رشت', 'کیش'],

      en: ['Tehran', 'Tabriz', 'Isfahan', 'Shiraz', 'Mashhad', 'Karaj', 'Rasht', 'Kish']
    };

    return cities[language as 'fa' | 'en'] || cities.fa;
  }, [language]);


  // هندل کردن جستجو
  const handleSearch = (city: string) => {
    searchCity(city);
    setHasSearched(true);
  };


  return (
    <div className={`min-h-screen py-8 transition-colors duration-300 
                bg-gradient-to-l from-[#1069b3] to-[#2193b0]
                dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 ${isRTL ? 'rtl' : 'ltr'}`}
    >

      <Container>
        {/* هدر و دکمه تم */}
        <div className="flex justify-between items-center mb-4">
          <Header />
        </div>

        {/* نوار جستجو */}
        <SearchBar onSearch={handleSearch} isLoading={loading} />

        {/* نمایش خطا */}
        {error && (
          <div className="mt-4">
            <ErrorMessage message={error} onRetry={() => window.location.reload()} />
          </div>
        )}

        {/* نمایش لودینگ */}
        {loading && <Spinner />}

        {/* نمایش شهرهای پیشنهادی (فقط وقتی هنوز جستجویی نشده و خطایی نیست) */}
        {!hasSearched && !loading && !error && (
          <SuggestedCities
            cities={suggestions}
            onSelectCity={handleSearch}
          />
        )}

        {/* نمایش آب و هوا وقتی جستجو انجام شده */}
        {weather && !loading && hasSearched && (
          <div className="mt-6 space-y-6">
            <WeatherCard data={weather} />

            <WeatherMap
              lat={weather.coord.lat}
              lon={weather.coord.lon}
              cityName={weather.name}
              temperature={weather.main.temp}
            />

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              {/* نمودار تغییرات دما */}
              {forecast && <TemperatureChart data={forecast} />}
            </motion.div>

            {forecast && <ForecastList data={forecast} />}
          </div>
        )}

        <Footer />
      </Container>
    </div>
  );
}

function App() {
  return (
    <LanguageProvider>
      <ThemeProvider>
        <AppContent />
      </ThemeProvider>
    </LanguageProvider>
  );
}

export default App;
