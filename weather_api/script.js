const https = require('https');

const apiKey = 'c68f1c12944d614d28dad685a31aee34';
const city = 'Bielsko-Biała';
const countryCode = 'PL'; // Jeśli wymagane

const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city},${countryCode}&appid=${apiKey}`;

https.get(apiUrl, (response) => {
    let data = '';

    // A chunk of data has been received.
    response.on('data', (chunk) => {
        data += chunk;
    });

    // The whole response has been received.
    response.on('end', () => {
        const weatherData = JSON.parse(data);
        console.log(weatherData);
        // Tutaj możesz wykonywać operacje na danych pogodowych, np. wyświetlać je w konsoli
    });

}).on("error", (error) => {
    console.error("Błąd podczas pobierania danych:", error.message);
});
