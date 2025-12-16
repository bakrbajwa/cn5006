import './App.css';

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import AddProduct from './components/AddProduct';
import UpdateProduct from './components/UpdateProduct';
import DeleteProduct from './components/DeleteProduct';
import SeasonSummary from './components/SeasonSummary';
import TopProducts from './components/TopProducts';
import RatingFilter from './components/RatingFilter';

function App() {
  return (
    <Router>
      <div className="container">

        <h1>Fashion Shop Admin</h1>

        {/* Navigation */}
        <nav style={{ marginBottom: '20px' }}>
          <Link to="/" style={{ marginRight: '10px' }}>Add Product</Link>
          <Link to="/update" style={{ marginRight: '10px' }}>Update Product</Link>
          <Link to="/delete" style={{ marginRight: '10px' }}>Delete Product</Link>
          <Link to="/season-summary" style={{ marginRight: '10px' }}>Season Summary</Link>
          <Link to="/top-products" style={{ marginRight: '10px' }}>Top Products</Link>
          <Link to="/rating-filter">Rating Filter</Link>
        </nav>

        {/* Routes */}
        <Routes>
          <Route path="/" element={<AddProduct />} />
          <Route path="/update" element={<UpdateProduct />} />
          <Route path="/delete" element={<DeleteProduct />} />
          <Route path="/season-summary" element={<SeasonSummary />} />
          <Route path="/top-products" element={<TopProducts />} />
          <Route path="/rating-filter" element={<RatingFilter />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
