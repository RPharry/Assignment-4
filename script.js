function getWeather() {
    const cityInput = document.getElementById("cityInput").value;

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityInput}&appid=2f5ba13d900be81e15faf2a05356f300&units=metric`)
        .then(response => response.json())
        .then(data => {
            const weatherInfo = document.getElementById("weatherInfo");
            const temp = data.main.temp;
            let weatherSymbol = "☀️"; // Default to sunny
            
            // Update the weatherSymbol based on conditions
            if (temp < 6) {
                weatherSymbol = "🥶"; // Cooler symbol for cold weather
            } else {
                switch (data.weather[0].main) {
                    case "Clouds":
                        weatherSymbol = "☁️";
                        break;
                    case "Rain":
                        weatherSymbol = "🌧️";
                        break;
                    case "Snow":
                        weatherSymbol = "❄️";
                        break;
                    case "Clear":
                        weatherSymbol = "☀️";
                        break;
                    case "Thunderstorm":
                        weatherSymbol = "⛈️";
                        break;
                    case "Drizzle":
                        weatherSymbol = "🌦️";
                        break;
                    case "Fog":
                        weatherSymbol = "🌫️";
                        break;
                }
            }

            weatherInfo.innerHTML = `
                <h2>Weather in ${data.name} ${weatherSymbol}</h2>
                <p>Temperature: ${temp}°C</p>
                <p>Description: ${data.weather[0].description}</p>
                <p>Humidity: ${data.main.humidity}% 💧</p>
                <p>Wind Speed: ${data.wind.speed} m/s 🌬️</p>
            `;
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
            const weatherInfo = document.getElementById("weatherInfo");
            weatherInfo.innerHTML = "<p>Failed to fetch weather data. Please try again.</p>";
        });
}
