// backend/models/FashionShop.js
const mongoose = require('mongoose');

const FashionShopSchema = new mongoose.Schema({
  productCategory: { type: String, required: true },
  productName: { type: String, required: true },
  unitsSold: { type: Number, required: true },
  returns: { type: Number, required: true },
  revenue: { type: Number, required: true },
  customerRating: { type: Number, required: true },
  stockLevel: { type: Number, required: true },
  season: { type: String, required: true },
  trendScore: { type: Number, required: true },
});

// Force MongoDB to use your EXACT collection name
const FashionShopData = mongoose.model(
  'FashionShopData',     // Model name
  FashionShopSchema,     // Schema
  'FashionShopData'      // Exact collection name in MongoDB
);

module.exports = FashionShopData;