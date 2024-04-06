const savedSearchEl = document.getElementById('search-history');
const todayForcastEl = document.getElementById('today-forecast');
const fiveDayForcastEl = document.getElementById('five-day-forecast');
const searchButtonEl = document.getElementById('search-btn');
const searchFormEl = document.getElementById('search-form');
const searchEl = document.getElementById('search');



searchFormEl.addEventListener('submit', function(event) {
    event.preventDefault();
    const formData = searchEl.value;

    console.log(formData);

    
    const apiUrl = `http://api.openweathermap.org/data/2.5/forecast?q=${encodeURIComponent(formData)}&units=imperial&appid=9ce3dde858452aa16a16dbfbb1a122f2`;

    let apiUrlArray = JSON.parse(localStorage.getItem('apiUrls')) || [];
    apiUrlArray.push(apiUrl);

    localStorage.setItem('apiUrls', JSON.stringify(apiUrlArray));
    
    fetch(apiUrl)
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        console.log('API response: ', data);

        todayForcastEl.innerHTML = '';

        const todayForecastData = {
            city: data.city.name,
            date: data.list[0].dt,
            weather: data.list[0].weather[0].main,
            temp: data.list[0].main.temp,
            wind: data.list[0].wind.speed,
            humidity: data.list[0].main.humidity
        };

        todayForecastCard(todayForecastData);

        
    })
    .catch(error => {
        console.error('Fetch error: ', error);
    })
    
    searchEl.value = '';
    savedSearchButton(apiUrl, formData);
});

function savedSearchButton (apiUrl, cityName) {


        const button = document.createElement('button')
        button.textContent = `${cityName}`
        button.classList.add('btn', 'btn-secondary', 'm-3');

        button.addEventListener('click', function(){
            fetch(apiUrl)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                console.log(data);
            })
            .catch(error => {
                console.error('Fetch error: ', error)
            });
        });

        savedSearchEl.appendChild(button);

};

const apiUrlArray = JSON.parse(localStorage.getItem('apiUrls')) || [];
apiUrlArray.forEach(apiUrl => {
    // Parse the API URL to extract the city name
    const urlParams = new URLSearchParams(apiUrl);
    const cityNameEncoded = urlParams.get('q');
    const cityName = decodeURIComponent(cityNameEncoded);

    createButtonFromLocalStorage(apiUrl, cityName);
});

function todayForecastCard(data) {
    const card = document.createElement('div');
    card.classList.add('card');

    const cardBody = document.createElement('div');
    cardBody.classList.add('card-body');

    let weatherIconText;
    if (data.weather === 'Clear') {
        weatherIconText = '☀️'; // Sun icon
    } else if (data.weather === 'Clouds') {
        weatherIconText = '☁️'; // Cloud icon
    } else if (data.weather === 'Rain') {
        weatherIconText = '🌧️'; // Rain icon
    } else if (data.weather === 'Snow') {
        weatherIconText = '❄️'; // Snow icon
    } else {
        weatherIconText = ''; // Default empty icon
    }

    const cityNameHeader = document.createElement('h2');
    cityNameHeader.classList.add('card-title');
    cityNameHeader.textContent = `${data.city} ${dayjs.unix(data.date).format('M/D/YYYY')} ${weatherIconText}`;

    const tempurature = document.createElement('p');
    tempurature.classList.add('card-text')
    tempurature.textContent = `Temp: ${data.temp}°F`;

    const wind = document.createElement('p');
    wind.classList.add('card-text')
    wind.textContent = `wind: ${data.wind} MPH`;

    const humidity = document.createElement('p');
    humidity.classList.add('card-text')
    humidity.textContent = `Temp: ${data.humidity} %`;

    cardBody.appendChild(cityNameHeader)
    cardBody.appendChild(tempurature)
    cardBody.appendChild(wind)
    cardBody.appendChild(humidity)
    card.appendChild(cardBody)

    todayForcastEl.appendChild(card)

}

savedSearchButton();