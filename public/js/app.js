// example of fetch
// fetch('https://puzzle.mead.io/puzzle').then(response => {
//     response.json().then(data => {
//         console.log(data);
//     });
// });
const weatherForm = document.querySelector('form');
const searchElement = weatherForm.querySelector('input');
const locationParagraph = document.querySelector('p.location');
const weatherParagraph = document.querySelector('p.weather');

function fetchWeather(address) {
    locationParagraph.innerHTML = 'Loading...';
    weatherParagraph.innerHTML = '';

    fetch(`/weather?address=${address}`).then(response => {
        response.json().then(data => {
            if (data.error) {
                locationParagraph.innerHTML = data.error;
                return;
            }
            locationParagraph.innerHTML = data.location;
            weatherParagraph.innerHTML = data.forecast;
        });
    });
}

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();
    fetchWeather(searchElement.value);
});
