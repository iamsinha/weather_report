document.getElementById('searchBtn').addEventListener('click', function() {
    const citySelect = document.getElementById('citySelect');
    const zipInput = document.getElementById('zipInput');
    const errorMsg = document.getElementById('errorMsg');
    const recentSearches = document.getElementById('recentSearches');

    recentSearches.innerHTML = '';
    errorMsg.classList.add('hidden');

    if (citySelect.value !== '' && zipInput.value !== '') {
        errorMsg.classList.remove('hidden');
        return;
    }

    const city = citySelect.value || zipInput.value;
    if (!city) return;

    fetchWeatherData(city);
});

document.getElementById('resetBtn').addEventListener('click', function() {
    document.getElementById('citySelect').value = '';
    document.getElementById('zipInput').value = '';
    document.getElementById('errorMsg').classList.add('hidden');
    document.getElementById('recentSearches').innerHTML = '';
});

function fetchWeatherData(city) {
    const apiKey = '018d2d8907491f2e57df4ed95f829719';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            const temperature = data.main.temp - 273.15; // Convert Kelvin to Celsius
            const newSearch = document.createElement('div');
            newSearch.textContent = `Temperature: ${temperature.toFixed(2)}°C`;
            recentSearches.prepend(newSearch);

            while (recentSearches.children.length > 3) {
                recentSearches.removeChild(recentSearches.lastChild);
            }
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
        });
}
