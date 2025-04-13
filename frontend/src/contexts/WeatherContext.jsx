import React, { createContext, useContext, useState } from 'react';
import axios from 'axios';

const WeatherContext = createContext();

export function useWeather() {
  return useContext(WeatherContext);
}

export function WeatherProvider({ children }) {
  const [weather, setWeather] = useState(null);

  const fetchWeather = async (city) => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_WEATHER_API}`, {
        params: {
          key: `${import.meta.env.VITE_WEATHER_API_KEY}`,
          q: city,
        },
      });
      setWeather(res.data);
    } catch (err) {
      console.error('Failed to fetch weather:', err);
    }
  };

  return (
    <WeatherContext.Provider value={{ weather, fetchWeather }}>
      {children}
    </WeatherContext.Provider>
  );
}
