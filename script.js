const apiKey = "3c75dfc2b6cb8e5dea29e9647af97f02";

async function getWeather(){

    const city = document.getElementById("city").value.trim();

    if(city === ""){
        alert("Please enter city name");
        return;
    }

    const query = encodeURIComponent(city);
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${query}&units=metric&appid=${apiKey}`;

    try{
        const response = await fetch(url);
        const data = await response.json();

        if(!response.ok){
            const msg = data && data.message ? data.message : "City not found";
            alert(msg.charAt(0).toUpperCase() + msg.slice(1));
            return;
        }

        // City Name
        document.getElementById("cityName").innerText = data.name + ", " + data.sys.country;

        // Temperature
        document.getElementById("temperature").innerText = Math.round(data.main.temp) + "°C";

        // Weather Description
        document.getElementById("description").innerText = data.weather[0].description;

        // Humidity
        document.getElementById("humidity").innerText = data.main.humidity + "%";

        // Wind Speed (API returns m/s — convert to km/h)
        const windSpeedMs = data.wind && data.wind.speed ? data.wind.speed : null;
        const windKmh = windSpeedMs !== null ? (windSpeedMs * 3.6).toFixed(1) : null;
        document.getElementById("wind").innerText = windKmh !== null ? windKmh + " km/h" : "N/A";

        // Weather Icon
        const icon = data.weather[0].icon;
        const iconEl = document.getElementById("weatherIcon");
        iconEl.src = `https://openweathermap.org/img/wn/${icon}@2x.png`;
        iconEl.alt = data.weather[0].description || "weather icon";

    } catch(error){
        console.error(error);
        alert("Something went wrong. Check console for details.");
    }
}