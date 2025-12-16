// src/components/UpdateProduct.js
import React, { useState } from 'react';
import axios from 'axios';

function UpdateProduct() {
  const [formData, setFormData] = useState({
    productName: '',
    productCategory: '',
    unitsSold: '',
    returns: '',
    revenue: '',
    customerRating: '',
    stockLevel: '',
    season: '',
    trendScore: '',
  });

  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const payload = {
        ...formData,
        unitsSold: Number(formData.unitsSold),
        returns: Number(formData.returns),
        revenue: Number(formData.revenue),
        customerRating: Number(formData.customerRating),
        stockLevel: Number(formData.stockLevel),
        trendScore: Number(formData.trendScore),
      };

      const res = await axios.post('http://localhost:5000/api/products/update', payload);

      setMessage(`Updated product: ${res.data.productName}`);
    } catch (err) {
      console.error(err);
      if (err.response && err.response.status === 404) {
        setMessage('Product not found');
      } else {
        setMessage('Error updating product');
      }
    }
  };

  return (
    <div style={{ maxWidth: '500px', margin: '0 auto' }}>
      <h2>Update Product</h2>
      <p>Enter the product name you want to update and the new values.</p>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Product Name (to find):</label>
          <input
            type="text"
            name="productName"
            value={formData.productName}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Product Category:</label>
          <input
            type="text"
            name="productCategory"
            value={formData.productCategory}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Units Sold:</label>
          <input
            type="number"
            name="unitsSold"
            value={formData.unitsSold}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Returns:</label>
          <input
            type="number"
            name="returns"
            value={formData.returns}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Revenue:</label>
          <input
            type="number"
            step="0.01"
            name="revenue"
            value={formData.revenue}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Customer Rating:</label>
          <input
            type="number"
            step="0.1"
            name="customerRating"
            value={formData.customerRating}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Stock Level:</label>
          <input
            type="number"
            name="stockLevel"
            value={formData.stockLevel}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Season:</label>
          <input
            type="text"
            name="season"
            value={formData.season}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Trend Score:</label>
          <input
            type="number"
            name="trendScore"
            value={formData.trendScore}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit">Update Product</button>
      </form>

      {message && <p>{message}</p>}
    </div>
  );
}

export default UpdateProduct;
