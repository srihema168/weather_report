import axios from 'axios';
import WeatherSummary from '../model/weathermodel.js';

const kelvinToCelsius = (kelvin) => kelvin - 273.15;

// Configurable interval for real-time weather updates (5 minutes)
const updateInterval = 5 * 60 * 1000;

// Threshold configuration (for alerts)
const tempThreshold = 35; // in Celsius
let consecutiveThresholdBreaches = 0;

export const getWeatherData = async (req, res) => {
  try {
    const apiKey = process.env.OPENWEATHER_API_KEY;
    const { city: searchCity } = req.query;

    let cities = ['Delhi', 'Mumbai', 'Chennai', 'Bangalore', 'Kolkata', 'Hyderabad'];
    if (searchCity) {
      cities = [searchCity];
    }

    let summaries = [];
    let alerts = [];

    for (let city of cities) {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`
      );
      const weatherData = response.data;

      const tempCelsius = kelvinToCelsius(weatherData.main.temp);
      const condition = weatherData.weather[0].main;
      const date = new Date().toISOString().split('T')[0];

      // Extract sunrise, sunset, and current time in UNIX format
      const { sunrise, sunset } = weatherData.sys;
      const currentTime = Math.floor(Date.now() / 1000);

      const isNight = currentTime < sunrise || currentTime > sunset;

      // Find or create a new daily weather summary
      let dailySummary = await WeatherSummary.findOne({ city, date });
      if (!dailySummary) {
        dailySummary = new WeatherSummary({
          city,
          date,
          averageTemp: tempCelsius,
          maxTemp: tempCelsius,
          minTemp: tempCelsius,
          dominantCondition: condition,
        });
      } else {
        dailySummary.averageTemp = (dailySummary.averageTemp + tempCelsius) / 2;
        dailySummary.maxTemp = Math.max(dailySummary.maxTemp, tempCelsius);
        dailySummary.minTemp = Math.min(dailySummary.minTemp, tempCelsius);
      }

      await dailySummary.save();

      // Check for alert threshold breaches
      if (tempCelsius > tempThreshold) {
        consecutiveThresholdBreaches += 1;
      } else {
        consecutiveThresholdBreaches = 0; // Reset if not breached
      }

      if (consecutiveThresholdBreaches >= 2) {
        alerts.push({
          city,
          message: `Alert! Temperature exceeded ${tempThreshold}°C for two consecutive updates.`,
        });
        consecutiveThresholdBreaches = 0; // Reset after alert
      }

      summaries.push({ ...dailySummary._doc, isNight });
    }

    res.json({ summaries, alerts });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error retrieving weather data' });
  }
};

// Function to update weather data periodically
setInterval(async () => {
  await getWeatherData({ query: {} }, { json: () => {} });
}, updateInterval);
