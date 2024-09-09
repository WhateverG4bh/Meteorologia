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
    
    const backgroundElement = document.querySelector('.background');
    
    let backgroundImage = '';
    let animationClass = '';

    switch (data.weather[0].main) {
        case 'Clear':
            backgroundImage = 'url("https://t3.ftcdn.net/jpg/05/91/10/70/360_F_591107051_Lmfn0UW7Gd2Xq6gks7Gf8JLAhKNXO0gJ.jpg")';

            break;
        case 'Rain':
            backgroundImage = 'url("https://images.ecycle.com.br/wp-content/uploads/2023/11/08112514/pexels-ave-calvar-martinez-3497624-scaled.jpg.webp")';

            break;
        case 'Clouds':
            backgroundImage = 'url("https://images.pexels.com/photos/1183099/pexels-photo-1183099.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1")';

            break;
        case 'Snow':
            backgroundImage = 'url("https://annphoto.net/wp-content/uploads/2021/02/13-dicas-para-fotografar-neve-um-guia-para-iniciantes.jpgfit750536ssl1-750x470.jpeg")';

            break;
        case 'Thunderstorm':
            backgroundImage = 'url("https://www.worldatlas.com/upload/1b/40/c1/shutterstock-1906271014.jpg")';

            break;
        default:
            backgroundImage = 'url("https://static.mundoeducacao.uol.com.br/mundoeducacao/conteudo_legenda/9baa4d787ac9b638b839530ae7180f70.jpg")';
    }

    document.getElementById('cityName').innerText = `Tempo ${cityName}`;
    document.getElementById('temperature').innerText = temperature;
    document.getElementById('weatherDescription').innerText = weatherDescription;
    document.getElementById('humidity').innerText = humidity;
    document.getElementById('weatherIcon').innerHTML = `<img src="${weatherIcon}" alt="Weather Icon">`;

    backgroundElement.style.backgroundImage = backgroundImage;
    backgroundElement.className = `background ${animationClass}`;
}
