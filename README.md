# Real-Time Weather Monitoring App

## Overview
This app provides real-time weather updates for cities using the OpenWeatherMap API, with features like configurable alerts, dynamic themes, and daily summaries.

## Features
- Live weather data with dynamic UI themes.
- Configurable temperature alerts.
- City search and daily weather summaries.

## Tech Stack
- **Backend**: Node.js, Express, MongoDB, Axios.
- **Frontend**: React.js, Material UI, Axios.

## Setup
1. **Backend**:
   - Navigate to the backend directory:
     ```bash
     cd backend
     ```
   - Install dependencies:
     ```bash
     npm install
     ```
   - Create `.env` file with your OpenWeatherMap API key:
     ```
     OPENWEATHER_API_KEY=your_api_key
     ```
   - Start the server:
     ```bash
     npm start
     ```
2. **Frontend**:
   - Navigate to the frontend directory:
     ```bash
     cd frontend
     ```
   - Install dependencies:
     ```bash
     npm install
     ```
   - Start the app:
     ```bash
     npm start
     ```

## How It Works
- **Backend**: Fetches weather data every 5 minutes, aggregates daily summaries, and generates alerts for extreme temperatures.
- **Frontend**: Displays weather summaries, dynamic themes, and supports city search.

## Configurable Options
- Update Interval: Default is 5 minutes.
- Temperature Threshold: Default is 35°C.

---
This app is built with modern web technologies and offers an intuitive way to monitor weather conditions.

