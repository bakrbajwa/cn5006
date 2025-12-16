import React, { useState, useEffect } from "react";

function WeatherMoodWidget(props) {
  const { weather, emoji } = props;
  const [count, setCount] = useState(0);
  const [message, setMessage] = useState("");

  function increaseCount() {
    setCount(count + 1);
  }

  useEffect(() => {
    if (count === 0) {
      setMessage("How does this weather make you feel?");
    } else {
      setMessage(`You clicked ${count} times for ${weather} weather!`);
    }
  }, [count, weather]);

  return (
    <div style={{
      border: "2px solid #ddd",
      padding: "20px",
      margin: "10px",
      width: "250px",
      borderRadius: "10px",
      textAlign: "center",
      backgroundColor: "#f9f9f9"
    }}>
      <h2>{weather}</h2>
      <p style={{ fontSize: "50px" }}>{emoji}</p>

      <button onClick={increaseCount}>
        Click to Express Mood
      </button>

      <p style={{ marginTop: "10px" }}>{message}</p>
    </div>
  );
}

export default WeatherMoodWidget;
