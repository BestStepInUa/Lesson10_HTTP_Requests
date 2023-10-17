const BOHUSLAV_LOCATION = '49.5409,30.8770';

const search = document.querySelector('.js-search');
const list = document.querySelector('.js-list');
search.addEventListener('submit', onSearch);

function onSearch(evt) {
    evt.preventDefault();
    
    const { query, days } = evt.currentTarget.elements;   
    
    getWeather(query.value, days.value)
        .then((data) => list.innerHTML = createMarkup(data.forecast.forecastday))
        .catch((error) => console.error(error))
}

function getWeather(city, days) {
    const BASE_API_URL = "http://api.weatherapi.com/v1";
    const API_KEY = "61069fb8abf74210b7d232148231510";

    return fetch(
        `${BASE_API_URL}/forecast.json?key=${API_KEY}&q=${city}&days=${days}&lang=uk`
    ).then((response) => {
        if (!response.ok) {
            throw new Error(response.statusText);
        }

        return response.json();
    })
};

function createMarkup(arr) {
    return arr.map(({ date, day: { avgtemp_c, condition: { text, icon } } }) =>
     `<li>
        <img src="${icon}" alt="${text}" />
        <p>${text}</p>
        <h2>${date}</h2>
        <h3>${avgtemp_c} <span>&#8451;</span></h3>
    </li>`
    ).join('');
}