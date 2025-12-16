// src/components/TopProducts.js
import React, { useState } from 'react';
import axios from 'axios';

function TopProducts() {
  const [season, setSeason] = useState('');
  const [minUnits, setMinUnits] = useState('');
  const [products, setProducts] = useState([]);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setMessage('');
      setProducts([]);

      const res = await axios.get('http://localhost:5000/api/top-products', {
        params: { season, minUnits },
      });

      if (res.data.length === 0) {
        setMessage('No products match this filter');
      } else {
        setProducts(res.data);
      }
    } catch (err) {
      console.error(err);
      setMessage('Error getting top products');
    }
  };

  return (
    <div style={{ maxWidth: '700px', margin: '0 auto' }}>
      <h2>Top Products by Units Sold</h2>
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
          <label>Minimum Units Sold:</label>
          <input
            type="number"
            value={minUnits}
            onChange={(e) => setMinUnits(e.target.value)}
            required
          />
        </div>

        <button type="submit">Get Top Products</button>
      </form>

      {message && <p>{message}</p>}

      {products.length > 0 && (
        <table border="1" cellPadding="5" style={{ marginTop: '20px', width: '100%' }}>
          <thead>
            <tr>
              <th>Product Name</th>
              <th>Category</th>
              <th>Units Sold</th>
              <th>Returns</th>
              <th>Revenue</th>
              <th>Rating</th>
              <th>Stock</th>
              <th>Season</th>
              <th>Trend Score</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p._id}>
                <td>{p.productName}</td>
                <td>{p.productCategory}</td>
                <td>{p.unitsSold}</td>
                <td>{p.returns}</td>
                <td>{p.revenue}</td>
                <td>{p.customerRating}</td>
                <td>{p.stockLevel}</td>
                <td>{p.season}</td>
                <td>{p.trendScore}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default TopProducts;
