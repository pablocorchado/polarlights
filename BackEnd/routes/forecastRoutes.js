const express = require('express');
const router = express.Router();
const forecastController = require('../controllers/forecastController');

module.exports = (pool) => {
    const { getWeatherForecast, getAuroraForecast } = forecastController(pool);

    router.get('/weather', getWeatherForecast);
    router.get('/aurora', getAuroraForecast);

    return router;
};
