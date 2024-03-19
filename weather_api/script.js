document.getElementById('city-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const city = document.getElementById('city').value;
    getWeather(city);
});

function getWeather(city) {
    const apiKey = '093f45e0a9860150d0ebed0d203b28d0';
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const weatherInfo = `
                <h2>Weather in ${city}</h2>
                <p>Temperature: ${Math.round(data.main.temp - 273.15)}°C</p>
                <p>Weather: ${data.weather[0].main}</p>
                <p>Description: ${data.weather[0].description}</p>
            `;
            document.getElementById('weather-info').innerHTML = weatherInfo;

            // Ustawienie ikony pogody
            const iconCode = data.weather[0].icon;
            const iconUrl = `http://openweathermap.org/img/wn/${iconCode}.png`;
            const weatherIcon = document.createElement('img');
            weatherIcon.src = iconUrl;
            weatherIcon.alt = 'Weather Icon';
            weatherIcon.classList.add('weather-icon');
            document.getElementById('weather-info').appendChild(weatherIcon);

            // Ustawienie koloru tła w zależności od pogody
            const weatherType = data.weather[0].main;
            const weatherInfoContainer = document.querySelector('.container');
            if (weatherType === 'Clear') {
                weatherInfoContainer.style.backgroundColor = '#94CAEF'; // Jasny niebieski dla czystego nieba
            } else if (weatherType === 'Clouds') {
                weatherInfoContainer.style.backgroundColor = '#D3D3D3'; // Szary dla zachmurzenia
            } else if (weatherType === 'Rain' || weatherType === 'Drizzle') {
                weatherInfoContainer.style.backgroundColor = '#7EC8E3'; // Niebieski dla deszczu
            } else if (weatherType === 'Thunderstorm') {
                weatherInfoContainer.style.backgroundColor = '#4F4F4F'; // Ciemnoszary dla burzy
            } else if (weatherType === 'Snow') {
                weatherInfoContainer.style.backgroundColor = '#FFFFFF'; // Biały dla śniegu
            } else {
                weatherInfoContainer.style.backgroundColor = '#F0F0F0'; // Domyślny kolor tła
            }
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
            document.getElementById('weather-info').innerHTML = '<p>Error fetching weather data. Please try again later.</p>';
        });
}
