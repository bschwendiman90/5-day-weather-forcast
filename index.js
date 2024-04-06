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

        
    })
    .catch(error => {
        console.error('Fetch error: ', error);
    })
    
    searchEl.value = '';
    savedSearchButton();
});

function savedSearchButton () {
    const apiUrlArray = JSON.parse(localStorage.getItem('apiUrls')) || [];
    apiUrlArray.forEach(apiUrl => {

        const urlParams = new URLSearchParams(apiUrl);
        const cityNameEncoded = urlParams.get('http://api.openweathermap.org/data/2.5/forecast?q');
        const cityName = decodeURIComponent(cityNameEncoded)


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

    });
}

savedSearchButton();