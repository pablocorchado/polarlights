const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { Pool } = require('pg');
const http = require('http');
const socketIo = require('socket.io');
const authenticate = require('./middleware/auth');
const admin = require('./config/firebaseAdmin');

dotenv.config(); // Asegúrate de que dotenv se inicializa aquí

// Verificar que la clave API se está cargando
console.log('Clave API de OpenWeatherMap:', process.env.OPENWEATHERMAP_API_KEY);

// Inicializar el servidor de Express
const app = express();
app.use(cors());
app.use(express.json());

// Conectar a PostgreSQL
const pool = require('./config/db');

// Configurar Socket.io
const server = http.createServer(app);
const io = socketIo(server);

io.on('connection', socket => {
    console.log('Nuevo usuario conectado');

    socket.on('disconnect', () => {
        console.log('Usuario desconectado');
    });

    // Envía notificaciones en tiempo real sobre eventos de auroras
    setInterval(() => {
        fetch(process.env.AURORA_API_URL)
            .then(response => response.json())
            .then(data => {
                socket.emit('auroraEvent', data);
            });
    }, 60000); // Verifica cada minuto
});

// Middleware de Autenticación
// Ya hemos importado `authenticate` arriba, así que no es necesario volver a declararlo aquí

// Rutas y Controladores
app.use('/api/images', authenticate, require('./routes/imageRoutes')(pool)); // Ruta protegida
app.use('/api/forecast', require('./routes/forecastRoutes')(pool));

// Puerto del Servidor
const PORT = process.env.PORT || 5001; // Cambia 5000 por 5001
server.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`));
