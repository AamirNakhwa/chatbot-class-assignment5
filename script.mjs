document.addEventListener("DOMContentLoaded", function () {
    const resultcontainer = document.getElementById("div-result");
    //resultcontainer.style.display = 'none'

    const locationInputElement = document.getElementById("location-input");
    const getWeatherButton = document.getElementById("get-weather-button");
    const weatherImageElement = document.querySelector(".weather-image");
    const outputcontainer = document.getElementById("div-output");
    
    getWeatherButton.addEventListener("click", function () {
        try
        {
        const location = locationInputElement.value;

        if (location.trim() === "") {
            alert("Please enter a location.");
            return;
        }

        document.getElementById('loader').classList.remove('hidden');

        const API_KEY = '505cd211ccfb414b811153617230707';
        // API endpoint for fetching weather data based on location
        const weatherAPI = `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${location}`
        axios.get(weatherAPI)
            .then(function (response) {
                const weatherData = response.data;
                //console.log(weatherData);
                debugger
                document.getElementById("location-display").innerText = `${weatherData.location.name} ${weatherData.location.region} ${weatherData.location.country} (${weatherData.location.tz_id})`;
               
                let weather_details = getRowHtml('Condition', weatherData.current.condition.text);
                weather_details += getRowHtml('Weather', `${weatherData.current.temp_c} celsius, ${weatherData.current.temp_f} fahrenheit`);
                weather_details += getRowHtml('Feels Like', `${weatherData.current.feelslike_c} celsius, ${weatherData.current.feelslike_f} fahrenheit`);
                weather_details += getRowHtml('Humidity', `${weatherData.current.humidity}`);
                weather_details += getRowHtml('Lat/Lon', `${weatherData.location.lat} lat, ${weatherData.location.lon} lon`);
                weather_details += getRowHtml('Time', `${weatherData.location.localtime} ` + (weatherData.current.is_day == 0 ? 'Night': 'Day'));
                weather_details += `<span>Information last updated on: ${weatherData.current.last_updated}</span>`;

                outputcontainer.innerHTML = weather_details;
                weatherImageElement.src = weatherData.current.condition.icon;
                //resultcontainer.style.display = 'block'

                resultcontainer.classList.remove('hidden');
            })
            .catch(function (error) {
                console.error("Error fetching weather data:", error);
                resultcontainer.classList.add('hidden');
            });
        }
        catch{
            resultcontainer.classList.add('hidden');
        }
        
        document.getElementById('loader').classList.add('hidden');
    });
});

const getRowHtml = (heading, content) =>
{
 return `<div class="column"> <div class="data"> <b>${heading}</b> <p>${content}</p> </div> </div>`
}