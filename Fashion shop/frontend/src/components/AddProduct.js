// src/components/AddProduct.js
import React, { useState } from 'react';
import axios from 'axios';

function AddProduct() {
  // form fields
  const [formData, setFormData] = useState({
    productCategory: '',
    productName: '',
    unitsSold: '',
    returns: '',
    revenue: '',
    customerRating: '',
    stockLevel: '',
    season: '',
    trendScore: '',
  });

  // message to show success or error
  const [message, setMessage] = useState('');

  // when you type in a box
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // when you click "Add Product"
  const handleSubmit = async (e) => {
    e.preventDefault(); // stop page refresh

    try {
      // change string numbers ("10") into real numbers (10)
      const payload = {
        ...formData,
        unitsSold: Number(formData.unitsSold),
        returns: Number(formData.returns),
        revenue: Number(formData.revenue),
        customerRating: Number(formData.customerRating),
        stockLevel: Number(formData.stockLevel),
        trendScore: Number(formData.trendScore),
      };

      // call your backend
      const res = await axios.post('http://localhost:5000/api/products/add', payload);

      setMessage(`Product added: ${res.data.productName}`);

      // clear the form after success
      setFormData({
        productCategory: '',
        productName: '',
        unitsSold: '',
        returns: '',
        revenue: '',
        customerRating: '',
        stockLevel: '',
        season: '',
        trendScore: '',
      });
    } catch (err) {
      console.error(err);
      setMessage('Error adding product');
    }
  };

  return (
    <div style={{ maxWidth: '500px', margin: '0 auto' }}>
      <h2>Add Product</h2>
      <form onSubmit={handleSubmit}>
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
          <label>Product Name:</label>
          <input
            type="text"
            name="productName"
            value={formData.productName}
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
            placeholder="Summer, Winter, etc."
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

        <button type="submit">Add Product</button>
      </form>

      {message && <div className="message">{message}</div>}

    </div>
  );
}

export default AddProduct;
