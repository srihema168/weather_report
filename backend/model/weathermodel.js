// weathermodel.js
import mongoose from 'mongoose';

const WeatherSummarySchema = new mongoose.Schema({
  city: String,
  date: String,
  averageTemp: Number,
  maxTemp: Number,
  minTemp: Number,
  dominantCondition: String,
});

const WeatherSummary = mongoose.model('WeatherSummary', WeatherSummarySchema);
export default WeatherSummary;
