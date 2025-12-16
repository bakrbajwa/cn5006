import React from "react";
import ReactDOM from "react-dom/client";
import WeatherMoodWidget from "./WeatherMoodWidget";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <div style={{ display: "flex", justifyContent: "center" }}>
    <WeatherMoodWidget weather="Sunny" emoji="☀️" />
    <WeatherMoodWidget weather="Rainy" emoji="🌧️" />
    <WeatherMoodWidget weather="Cloudy" emoji="☁️" />
  </div>
);
