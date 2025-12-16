// src/components/RatingFilter.js
import React, { useState } from 'react';
import axios from 'axios';

function RatingFilter() {
  const [season, setSeason] = useState('');
  const [minRating, setMinRating] = useState('');
  const [products, setProducts] = useState([]);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setMessage('');
      setProducts([]);

      const res = await axios.get('http://localhost:5000/api/rating-filter', {
        params: { season, minRating },
      });

      if (res.data.length === 0) {
        setMessage('No products match this rating filter');
      } else {
        setProducts(res.data);
      }
    } catch (err) {
      console.error(err);
      setMessage('Error getting rating filter data');
    }
  };

  return (
    <div style={{ maxWidth: '700px', margin: '0 auto' }}>
      <h2>Products by Average Rating</h2>
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

        <div>
          <label>Minimum Average Rating:</label>
          <input
            type="number"
            step="0.1"
            value={minRating}
            onChange={(e) => setMinRating(e.target.value)}
            required
          />
        </div>

        <button type="submit">Filter</button>
      </form>

      {message && <p>{message}</p>}

      {products.length > 0 && (
        <table border="1" cellPadding="5" style={{ marginTop: '20px', width: '100%' }}>
          <thead>
            <tr>
              <th>Product Name</th>
              <th>Category</th>
              <th>Units Sold (Total)</th>
              <th>Returns (Total)</th>
              <th>Revenue (Total)</th>
              <th>Average Rating</th>
              <th>Stock Level</th>
              <th>Trend Score (Avg)</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p._id}>
                <td>{p._id}</td> {/* _id is productName from the aggregation */}
                <td>{p.productCategory}</td>
                <td>{p.unitsSold}</td>
                <td>{p.returns}</td>
                <td>{p.revenue}</td>
                <td>{p.avgRating.toFixed ? p.avgRating.toFixed(2) : p.avgRating}</td>
                <td>{p.stockLevel}</td>
                <td>{p.trendScore}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default RatingFilter;
