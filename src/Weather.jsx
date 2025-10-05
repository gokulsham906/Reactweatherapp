import { useState, useEffect } from "react";
import axios from "axios";
import { WiDaySunny, WiRain, WiCloudy, WiSnow } from "react-icons/wi";

function Weather({ location }) {
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!location) return;

    const apiKey = "c0d1ef7c5b35e1d075951ff2b2fe6bee"; // Replace with your OpenWeatherMap API key
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`;

    axios
      .get(url)
      .then((res) => {
        setWeather(res.data);
        setError("");
      })
      .catch((err) => {
        console.error(err);
        setWeather(null);
        setError("City not found. Please try again.");
      });
  }, [location]);

  const getWeatherIcon = (main) => {
    switch (main) {
      case "Clear":
        return <WiDaySunny className="text-yellow-400 text-7xl" />;
      case "Rain":
        return <WiRain className="text-blue-400 text-7xl" />;
      case "Clouds":
        return <WiCloudy className="text-gray-300 text-7xl" />;
      case "Snow":
        return <WiSnow className="text-white text-7xl" />;
      default:
        return <WiDaySunny className="text-yellow-400 text-7xl" />;
    }
  };

  const getBackground = (main) => {
    switch (main) {
      case "Clear":
        return "from-yellow-400 to-orange-500";
      case "Rain":
        return "from-blue-400 to-blue-700";
      case "Clouds":
        return "from-gray-400 to-gray-700";
      case "Snow":
        return "from-white to-blue-200";
      default:
        return "from-blue-400 to-blue-700";
    }
  };

  if (error)
    return (
      <div className="text-center text-red-500 font-semibold mt-6">{error}</div>
    );

  if (!weather)
    return <p className="text-center mt-20 text-xl">Loading weather...</p>;

  return (
    <div
      className={`bg-gradient-to-b ${getBackground(
        weather.weather[0].main
      )} text-white rounded-2xl shadow-lg p-8 max-w-sm mx-auto mt-6 text-center transition-all duration-500`}
    >
      <h1 className="text-2xl font-bold mb-4">{weather.name}</h1>
      <div className="my-4">{getWeatherIcon(weather.weather[0].main)}</div>
      <h1 className="text-5xl font-bold mb-2">{weather.main.temp}°C</h1>
      <p className="text-xl capitalize">{weather.weather[0].description}</p>
    </div>
  );
}

export default Weather;
