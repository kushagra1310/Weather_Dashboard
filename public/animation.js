window.addEventListener("DOMContentLoaded", () => {
    document.getElementById("submission").addEventListener("click", async () => {
        const city_name = document.getElementById("cityinput").value.trim();
        const tempDisplay = document.getElementById("temp_display");
        if (!city_name) {
            tempDisplay.innerHTML = "⚠️ Please enter a city name.";
            return;
        }

        tempDisplay.innerHTML = "⏳ Loading weather data...";

        try {
            const backendBaseURL=location.hostname==="localhost"? "http://localhost:3000":"https://weather-dashboard-zj0c.onrender.com";
            const response=await fetch(`${backendBaseURL}/weather?city=${city_name}`);
            if (!response.ok) {
                throw new Error("City not found");
            }

            const data = await response.json();
            console.log(data);

            tempDisplay.innerHTML = `
        🌡️ <strong>Temperature (Max):</strong> ${data.data.main.temp_max}°C<br>
        🧊 <strong>Temperature (Min):</strong> ${data.data.main.temp_min}°C<br>
        💧 <strong>Humidity:</strong> ${data.data.main.humidity}%<br>
        🌬️ <strong>Wind Speed:</strong> ${data.data.wind.speed} m/s
      `;
        } catch (error) {
            tempDisplay.innerHTML = `❌ Error: ${error.message}`;
            console.error(error);
        }
    });
});
