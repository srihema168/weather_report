import express from 'express';
import { connectDb } from './config/db.js';
import dotenv from 'dotenv';
import cors from 'cors';
import 'dotenv/config';
import weatherRoutes from './routes/weather.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// DB connection
connectDb()
  .then(() => {
    console.log('Connected to database');
  })
  .catch((err) => {
    console.error('Error connecting to database:', err);
    // Add retry mechanism or more informative error message here
  });

app.use('/api/weather', weatherRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
