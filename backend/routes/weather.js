import express from 'express';
import { getWeatherData } from '../Controlleres/Controller.js'; 

const router = express.Router();

router.get('/summary', getWeatherData);

export default router;
