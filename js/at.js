const apiKey = '77c810b0988c55610a7e5be6a8b121d8'; // Substitua com sua chave da API do OpenWeatherMap

document.getElementById('searchButton').addEventListener('click', function() {
    const city = document.getElementById('cityInput').value.trim();
    if (city) {
        fetchWeather(city);
    } else {
        alert('Por favor, insira uma cidade.');
    }
});


function fetchWeather(city) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=pt_br`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro na resposta da API: ' + response.status);
            }
            return response.json();
        })
        .then(data => displayWeather(data))
        .catch(error => console.error('Erro ao obter dados da API:', error));
}

function displayWeather(data) {
    if (data.cod === '404') {
        alert('Cidade não encontrada.');
        return;
    }
    
    const cityName = data.name;
    const temperature = data.main.temp.toFixed(2) + ' °C';
    const weatherDescription = data.weather[0].description;
    const humidity = 'Umidade: ' + data.main.humidity + '%';
    const weatherIcon = `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`;

    document.getElementById('cityName').innerText = `Tempo ${cityName}`;
    document.getElementById('temperature').innerText = temperature;
    document.getElementById('weatherDescription').innerText = weatherDescription;
    document.getElementById('humidity').innerText = humidity;
    document.getElementById('weatherIcon').innerHTML = `<img src="${weatherIcon}" alt="Weather Icon">`;
}
