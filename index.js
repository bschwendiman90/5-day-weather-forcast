const savedSearchEl = document.getElementById('search-history');
const todayForecastEl = document.getElementById('today-forecast');
const fiveDayForecastEl = document.getElementById('five-day-forecast');
const searchButtonEl = document.getElementById('search-btn');
const searchFormEl = document.getElementById('search-form');
const searchEl = document.getElementById('search');



searchFormEl.addEventListener('submit', function(event) {
    event.preventDefault();
    const formData = searchEl.value;

    console.log(formData);

    
    const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${encodeURIComponent(formData)}&units=imperial&appid=9ce3dde858452aa16a16dbfbb1a122f2`;

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

        todayForecastEl.innerHTML = '';

        const todayForecastData = {
            city: data.city.name,
            date: data.list[0].dt,
            weather: data.list[0].weather[0].main,
            temp: data.list[0].main.temp,
            wind: data.list[0].wind.speed,
            humidity: data.list[0].main.humidity
        };

        todayForecastCard(todayForecastData);

        fiveDayForecastEl.innerHTML = '';

        const fiveDayData = data.list.slice(4,5).concat(data.list.slice(12,13)).concat(data.list.slice(20,21)).concat(data.list.slice(28,29)).concat(data.list.slice(36,37))

        fiveDayData.forEach((dayData, index) => {
            const fiveDayForecastData ={
                date: dayData.dt,
                weather: dayData.weather[0].main,
                temp: dayData.main.temp,
                wind: dayData.wind.speed,
                humidity: dayData.main.humidity
            };
            fiveDayForecastCard(fiveDayForecastData, index);
        });



        
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

                todayForecastEl.innerHTML = '';

        const todayForecastData = {
            city: data.city.name,
            date: data.list[0].dt,
            weather: data.list[0].weather[0].main,
            temp: data.list[0].main.temp,
            wind: data.list[0].wind.speed,
            humidity: data.list[0].main.humidity
        };

        todayForecastCard(todayForecastData);

        fiveDayForecastEl.innerHTML = '';

        const fiveDayData = data.list.slice(4,5).concat(data.list.slice(12,13)).concat(data.list.slice(20,21)).concat(data.list.slice(28,29)).concat(data.list.slice(36,37))

        fiveDayData.forEach((dayData, index) => {
            const fiveDayForecastData ={
                date: dayData.dt,
                weather: dayData.weather[0].main,
                temp: dayData.main.temp,
                wind: dayData.wind.speed,
                humidity: dayData.main.humidity
            };
            fiveDayForecastCard(fiveDayForecastData, index);
        });
            })
            .catch(error => {
                console.error('Fetch error: ', error)
            });
        });

        savedSearchEl.appendChild(button);

};



function todayForecastCard(data) {
    const card = document.createElement('div');
    card.classList.add('card');

    const cardBody = document.createElement('div');
    cardBody.classList.add('card-body');

    let weatherIconText;
    if (data.weather === 'Clear') {
        weatherIconText = '☀️'; 
    } else if (data.weather === 'Clouds') {
        weatherIconText = '☁️'; 
    } else if (data.weather === 'Rain') {
        weatherIconText = '🌧️'; 
    } else if (data.weather === 'Snow') {
        weatherIconText = '❄️'; 
    } else {
        weatherIconText = ''; 
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

    todayForecastEl.appendChild(card)

};

function fiveDayForecastCard(data, index){
    const card = document.createElement('div');
    card.classList.add('card', 'col-md-8', 'm-3', 'bg-secondary', 'col-lg-2', 'col-12', 'col-lg-9', 'col-xl-2');

    const cardBody = document.createElement('div');
    cardBody.classList.add('card-body');

    let weatherIconText;
    if (data.weather === 'Clear') {
        weatherIconText = '☀️'; 
    } else if (data.weather === 'Clouds') {
        weatherIconText = '☁️'; 
    } else if (data.weather === 'Rain') {
        weatherIconText = '🌧️'; 
    } else if (data.weather === 'Snow') {
        weatherIconText = '❄️'; 
    } else {
        weatherIconText = ''; 
    }

    const cityNameHeader = document.createElement('h4');
    cityNameHeader.classList.add('card-title');
    cityNameHeader.textContent = `${dayjs.unix(data.date).format('M/D/YYYY')}`;

    const weather = document.createElement('p');
    weather.classList.add('card-text');
    weather.textContent = `${weatherIconText}`

    const tempurature = document.createElement('h2');
    tempurature.classList.add('card-text')
    tempurature.textContent = `Temp: ${data.temp}°F`;

    const wind = document.createElement('p');
    wind.classList.add('card-text')
    wind.textContent = `wind: ${data.wind} MPH`;

    const humidity = document.createElement('p');
    humidity.classList.add('card-text')
    humidity.textContent = `Temp: ${data.humidity} %`;

    cardBody.appendChild(cityNameHeader);
    cardBody.appendChild(weather);
    cardBody.appendChild(tempurature);
    cardBody.appendChild(wind);
    cardBody.appendChild(humidity);
    card.appendChild(cardBody);

    fiveDayForecastEl.appendChild(card);
}

function responsiveWdith () {
    const fiveDayForecast = document.getElementById('five-day-forecast');
    if (window.innerWidth <= 1500) {
        fiveDayForecast.classList.remove('row')
        
    } else {
        fiveDayForecast.classList.add('row')
        
    }
}

responsiveWdith();
window.addEventListener('resize', responsiveWdith);
