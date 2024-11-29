document.addEventListener('DOMContentLoaded', () => {
    initializeMap();
    updateForecast();
});

function initializeMap() {
    const map = L.map('auroraMap').setView([65, -19], 4);
    
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    // Añadir una capa para la probabilidad de auroras (simulada)
    const auroraLayer = L.circle([65, -19], {
        color: '#4CAF50',
        fillColor: '#4CAF50',
        fillOpacity: 0.2,
        radius: 1000000
    }).addTo(map);

    // Lugares populares para ver auroras
    const places = [
        {name: "Tromsø, Noruega", coords: [69.6492, 18.9553]},
        {name: "Reykjavik, Islandia", coords: [64.1265, -21.8174]},
        {name: "Fairbanks, Alaska", coords: [64.8378, -147.7164]},
        {name: "Yellowknife, Canadá", coords: [62.4540, -114.3718]}
    ];

    places.forEach(place => {
        L.marker(place.coords)
            .addTo(map)
            .bindPopup(`<b>${place.name}</b><br>Punto de observación de auroras`);
    });
}

async function updateForecast() {
    const forecastData = await fetchAuroraForecast();
    const forecastList = document.getElementById('forecastList');
    forecastList.innerHTML = '';

    forecastData.forEach(day => {
        const forecastItem = document.createElement('div');
        forecastItem.classList.add('forecast-item');
        
        let activity = 'Baja';
        let colorClass = 'low';
        
        if (day.kpIndex > 4) {
            activity = 'Alta';
            colorClass = 'high';
        } else if (day.kpIndex > 2) {
            activity = 'Moderada';
            colorClass = 'moderate';
        }

        const date = new Date(day.date);
        const formattedDate = date.toLocaleDateString('es-ES', { 
            weekday: 'long', 
            day: 'numeric',
            month: 'long'
        });

        forecastItem.innerHTML = `
            <h3>${formattedDate}</h3>
            <p>Actividad: <span class="activity ${colorClass}">${activity}</span></p>
            <p>Índice Kp: ${day.kpIndex}</p>
        `;
        forecastList.appendChild(forecastItem);
    });
}

async function fetchAuroraForecast() {
    // Simular una llamada a la API
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve([
                { date: '2023-05-20', kpIndex: 5 },
                { date: '2023-05-21', kpIndex: 3 },
                { date: '2023-05-22', kpIndex: 4 },
                { date: '2023-05-23', kpIndex: 2 },
                { date: '2023-05-24', kpIndex: 6 }
            ]);
        }, 1000);
    });
}

