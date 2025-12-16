// src/components/SeasonSummary.js
import React, { useState } from 'react';
import axios from 'axios';

function SeasonSummary() {
  const [season, setSeason] = useState('');
  const [summary, setSummary] = useState(null);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setMessage('');
      setSummary(null);

      const res = await axios.get('http://localhost:5000/api/season-summary', {
        params: { season },
      });

      setSummary(res.data);
    } catch (err) {
      console.error(err);
      if (err.response && err.response.status === 404) {
        setMessage('No data for that season');
      } else if (err.response && err.response.status === 400) {
        setMessage('Season is required');
      } else {
        setMessage('Error getting season summary');
      }
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '0 auto' }}>
      <h2>Season Summary</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Season:</label>
          <input
            type="text"
            value={season}
            onChange={(e) => setSeason(e.target.value)}
            placeholder="e.g. Summer"
            required
          />
        </div>
        <button type="submit">Get Summary</button>
      </form>

      {message && <p>{message}</p>}

      {summary && (
        <div style={{ marginTop: '20px' }}>
          <h3>Results for: {summary._id}</h3>
          <p>Total Units Sold: {summary.totalUnitsSold}</p>
          <p>Total Returns: {summary.totalReturns}</p>
          <p>Total Revenue: {summary.totalRevenue}</p>
        </div>
      )}
    </div>
  );
}

export default SeasonSummary;
