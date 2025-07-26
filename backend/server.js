const express = require("express");
const cors = require("cors")
require("dotenv").config();

const app = express();
app.use(cors());
const API_key = process.env.API_KEY;
app.get("/weather", async (req, res) => {
    const city_name = req.query.city;
    if (city_name) {
        try {
            const response = await fetch(
                `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
                    city_name
                )}&appid=${API_key}&units=metric`
            );
            const data = await response.json();
            console.log(data);
            if (!response.ok) {
                return res.status(response.status).json({ error: data.message || "Weather API error" });
            }

            res.json({data});
        }
        catch (error) {
            res.status(500).json({ error: "Failed to fetch weather data" });
        }
    }
    else
        return res.status(400).json({ error: "City is required" });
});
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});