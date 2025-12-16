// src/components/DeleteProduct.js
import React, { useState } from 'react';
import axios from 'axios';

function DeleteProduct() {
  const [productName, setProductName] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post('http://localhost:5000/api/products/delete', {
        productName,
      });

      setMessage(res.data.message || 'Product deleted');
      setProductName('');
    } catch (err) {
      console.error(err);
      if (err.response && err.response.status === 404) {
        setMessage('Product not found');
      } else {
        setMessage('Error deleting product');
      }
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '0 auto' }}>
      <h2>Delete Product</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Product Name:</label>
          <input
            type="text"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            required
          />
        </div>

        <button type="submit">Delete</button>
      </form>

      {message && <p>{message}</p>}
    </div>
  );
}

export default DeleteProduct;
