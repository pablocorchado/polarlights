const fetch = require('node-fetch');

module.exports = (pool) => {
    return {
        getWeatherForecast: async (req, res) => {
            try {
                const city = req.query.city || 'Tokyo'; // Ciudad por defecto
                const apiKey = process.env.WEATHERSTACK_API_KEY;
                const response = await fetch(`http://api.weatherstack.com/current?access_key=${apiKey}&query=${city}`);
                if (!response.ok) {
                    throw new Error(`Error al obtener datos meteorológicos: ${response.statusText}`);
                }
                const weather = await response.json();
                res.json(weather);
            } catch (error) {
                res.status(500).json({ message: error.message });
            }
        },
        getAuroraForecast: async (req, res) => {
            try {
                const response = await fetch(process.env.AURORA_API_URL);
                if (!response.ok) {
                    throw new Error(`Error al obtener datos de auroras: ${response.statusText}`);
                }
                const aurora = await response.json();
                res.json(aurora);
            } catch (error) {
                res.status(500).json({ message: error.message });
            }
        }
    };
};
