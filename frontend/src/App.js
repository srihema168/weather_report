import React, { useEffect, useState, useCallback } from 'react';
import WeatherSummary from './Components/weathersummary'; 
import { getWeatherSummary } from './Service/weatherservice';
import { Container, Typography, Grid, TextField, Button, Box, Alert, ImageListItem } from '@mui/material';
import './App.css';

function App() {
  const [weatherData, setWeatherData] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [background, setBackground] = useState('');
  const [textColor, setTextColor] = useState('black');
  const [alerts, setAlerts] = useState([]); 
  const [error, setError] = useState('');  

  const fetchData = useCallback(async (city = '') => {
    try {
      const { summaries, alerts } = await getWeatherSummary(city);
      
      if (!summaries || summaries.length === 0) {
        setError(`City "${city}" not found. Please try again.`);
        setWeatherData([]);
        setAlerts([]);
        setBackground('default-bg');
        setTextColor('black');
        return;
      }

      setWeatherData(summaries);
      setAlerts(alerts);
      setError(''); 

      const { dominantCondition, isNight } = summaries[0];
      handleBackgroundChange(dominantCondition.toLowerCase(), isNight);
    } catch (err) {
      setError('An error occurred while fetching the weather data. Please try again.');
      setWeatherData([]);
      setAlerts([]);
      setBackground('default-bg');
      setTextColor('black');
    }
  }, []);

  const handleBackgroundChange = (condition, isNight) => {
    let backgroundClass = '';
    let color = isNight ? 'white' : 'black'; 
    switch (condition) {
      case 'clear':
      case 'sunny':
        backgroundClass = isNight ? 'clear-night-bg' : 'sunny-bg';
        break;
      case 'clouds':
      case 'cloudy':
        backgroundClass = isNight ? 'cloudy-night-bg' : 'cloudy-bg';
        break;
      case 'rain':
      case 'drizzle':
        backgroundClass = isNight ? 'rainy-night-bg' : 'rainy-bg';
        break;
      case 'snow':
        backgroundClass = isNight ? 'snowy-night-bg' : 'snowy-bg';
        break;
      default:
        backgroundClass = 'default-bg';
        break;
    }

    setBackground(backgroundClass);
    setTextColor(color); 
  };

  useEffect(() => {
    fetchData(); 
  }, [fetchData]);

  const handleSearch = () => {
    fetchData(searchValue); 
  };

  return (
    <Box
      className={background}
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Container maxWidth="lg" sx={{ padding: '2rem', flexGrow: 1 }}>
        <ImageListItem 
          sx={{
            '&:hover img': {
              transform: 'scale(1.1)', 
              transition: 'transform 0.3s ease',
            },
          }}
        >
          <img
            src={`image3.png`}
            alt="Weather icon"
            style={{ maxWidth: '50px', maxHeight: '50px', borderRadius: '10px' }}
            loading="lazy"
          />
        </ImageListItem>

        <Typography
          variant="h4"
          align="center"
          gutterBottom
          sx={{ marginTop: '20px', color: textColor }} 
        >
          Weather Summary
        </Typography>

        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
          <TextField
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            label="Search by City"
            variant="outlined"
            sx={{ borderRadius: '10px', width: '300px', backgroundColor: 'white' }}
          />
          <Button
            onClick={handleSearch}
            variant="contained"
            sx={{ marginLeft: '10px', borderRadius: '10px', backgroundColor: '#1976d2' }}
          >
            Search
          </Button>
        </div>

        {error && (
          <Alert severity="error" sx={{ marginBottom: '20px' }}>
            {error}
          </Alert>
        )}

        {alerts.length > 0 && (
          <Alert severity="warning" sx={{ marginBottom: '20px' }}>
            {alerts.map((alert, index) => (
              <Typography key={index}>{alert.message}</Typography>
            ))}
          </Alert>
        )}

        {weatherData.length > 0 ? (
          <Grid container spacing={3} justifyContent="center">
            {weatherData.map((summary, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <WeatherSummary summary={summary} textColor={textColor} />
              </Grid>
            ))}
          </Grid>
        ) : !error && (
          <Typography variant="body1" align="center" sx={{ color: textColor }}>
            Loading...
          </Typography>
        )}
      </Container>
    </Box>
  );
}

export default App;
