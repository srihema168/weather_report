  import React from 'react';
  import { Card, CardContent, Typography } from '@mui/material';

  const WeatherSummary = ({ summary }) => {
    return (
      <Card
        sx={{
          boxShadow: 3,
          transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
          borderRadius: '20px'  ,  
          '&:hover': {
            transform: 'scale(1.05)',
            boxShadow: 6,  
              
          },
        }}
      >
        <CardContent>
          <Typography variant="h5" component="div" gutterBottom>
            {summary.city}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Date: {summary.date}
          </Typography>
          <Typography variant="body2" sx={{ margin: '8px 0' }}>
            Average Temperature: {summary.averageTemp.toFixed(2)}°C
          </Typography>
          <Typography variant="body2">
            Max Temperature: {summary.maxTemp.toFixed(2)}°C
          </Typography>
          <Typography variant="body2">
            Min Temperature: {summary.minTemp.toFixed(2)}°C
          </Typography>
          <Typography variant="body2" color="text.primary">
            Dominant Condition: {summary.dominantCondition}
          </Typography>
        </CardContent>
      </Card>
    );
  };

  export default WeatherSummary;
