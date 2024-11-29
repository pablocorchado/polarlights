// Esperar a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', () => {
    // Navegación suave
    implementSmoothScroll();

    // Inicializar la galería
    initializeGallery();

    // Inicializar el pronóstico
    initializeForecast();

    // Animación de aparición para secciones
    initializeSectionAnimations();
});

// Implementar desplazamiento suave para la navegación
function implementSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
}

// Inicializar la galería con lightbox
function initializeGallery() {
    const modal = document.getElementById("modal");
    const modalImg = document.getElementById("modal-img");
    const captionText = document.getElementById("caption");
    const closeBtn = document.getElementsByClassName("close")[0];

    document.querySelectorAll('.gallery-item').forEach(img => {
        img.addEventListener('click', function() {
            modal.style.display = "block";
            modalImg.src = this.src;
            captionText.innerHTML = this.alt;
        });
    });

    closeBtn.onclick = function() {
        modal.style.display = "none";
    }

    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
}

// Simular pronóstico de auroras
function initializeForecast() {
    const forecastContainer = document.querySelector('.forecast-container');
    const days = ['Hoy', 'Mañana', 'Pasado mañana'];
    const activities = ['Baja', 'Moderada', 'Alta'];

    days.forEach(day => {
        const forecastItem = document.createElement('div');
        forecastItem.classList.add('forecast-item');
        const activity = activities[Math.floor(Math.random() * activities.length)];
        forecastItem.innerHTML = `
            <h3>${day}</h3>
            <p>Actividad ${activity}</p>
        `;
        forecastContainer.appendChild(forecastItem);
    });
}

// Animación de aparición para secciones
function initializeSectionAnimations() {
    const sections = document.querySelectorAll('section');
    
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const sectionObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        sectionObserver.observe(section);
    });
}

// Función para cargar datos de la API de pronóstico (simulada)
async function fetchAuroraForecast() {
    // Simular una llamada a la API
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve([
                { date: '2023-05-20', kpIndex: 5 },
                { date: '2023-05-21', kpIndex: 3 },
                { date: '2023-05-22', kpIndex: 4 }
            ]);
        }, 1000);
    });
}

// Actualizar el pronóstico con datos reales (simulados)
async function updateForecast() {
    const forecastData = await fetchAuroraForecast();
    const forecastContainer = document.querySelector('.forecast-container');
    forecastContainer.innerHTML = ''; // Limpiar pronóstico existente

    forecastData.forEach(day => {
        const forecastItem = document.createElement('div');
        forecastItem.classList.add('forecast-item');
        let activity = 'Baja';
        if (day.kpIndex > 4) activity = 'Alta';
        else if (day.kpIndex > 2) activity = 'Moderada';

        forecastItem.innerHTML = `
            <h3>${new Date(day.date).toLocaleDateString('es-ES', { weekday: 'long' })}</h3>
            <p>Actividad ${activity}</p>
            <p>Índice Kp: ${day.kpIndex}</p>
        `;
        forecastContainer.appendChild(forecastItem);
    });
}

// Llamar a updateForecast cuando la página se carga
document.addEventListener('DOMContentLoaded', () => {
    updateForecast();
    // Actualizar el pronóstico cada hora
    setInterval(updateForecast, 3600000);
});

// Animación del hero
function animateHero() {
    const heroContent = document.querySelector('.hero-content');
    heroContent.style.opacity = '0';
    heroContent.style.transform = 'translateY(20px)';

    setTimeout(() => {
        heroContent.style.transition = 'opacity 1s ease-out, transform 1s ease-out';
        heroContent.style.opacity = '1';
        heroContent.style.transform = 'translateY(0)';
    }, 500);
}

// Llamar a la animación del hero cuando la página se carga
window.addEventListener('load', animateHero);

// Cambiar el color de fondo del header al hacer scroll
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (window.scrollY > 50) {
        header.style.backgroundColor = 'rgba(10, 10, 42, 1)';
    } else {
        header.style.backgroundColor = 'rgba(10, 10, 42, 0.8)';
    }
});

