// server.js
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const FashionShopData = require('./models/FashionShop');

// 1) connect to MongoDB
connectDB();

// 2) create express app
const app = express();

// 3) middlewares
app.use(express.json()); // lets us read JSON bodies
app.use(cors()); // allow React to call this server

// test route just to see if server works
app.get('/', (req, res) => {
  res.send('Fashion Shop API is running');
});

/**
 * TASK 1.5 - ADD PRODUCT
 * POST /api/products/add
 */
app.post('/api/products/add', async (req, res) => {
  try {
    const {
      productCategory,
      productName,
      unitsSold,
      returns,
      revenue,
      customerRating,
      stockLevel,
      season,
      trendScore,
    } = req.body;

    const newProduct = new FashionShopData({
      productCategory,
      productName,
      unitsSold,
      returns,
      revenue,
      customerRating,
      stockLevel,
      season,
      trendScore,
    });

    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (err) {
    console.error('Error adding product:', err.message);
    res.status(500).json({ message: 'Server error while adding product' });
  }
});

/**
 * TASK 1.6 - UPDATE ONE PRODUCT BY NAME
 * POST /api/products/update
 * body must include productName (the one to find)
 */
app.post('/api/products/update', async (req, res) => {
  try {
    const {
      productName, // which product to update
      productCategory,
      unitsSold,
      returns,
      revenue,
      customerRating,
      stockLevel,
      season,
      trendScore,
    } = req.body;

    // find product by name and update its fields
    const updated = await FashionShopData.findOneAndUpdate(
      { productName }, // search criteria
      {
        productCategory,
        unitsSold,
        returns,
        revenue,
        customerRating,
        stockLevel,
        season,
        trendScore,
      },
      { new: true } // return the updated document
    );

    if (!updated) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.json(updated);
  } catch (err) {
    console.error('Error updating product:', err.message);
    res.status(500).json({ message: 'Server error while updating product' });
  }
});

/**
 * TASK 1.7 - DELETE ONE PRODUCT BY NAME
 * POST /api/products/delete
 */
app.post('/api/products/delete', async (req, res) => {
  try {
    const { productName } = req.body;

    const deleted = await FashionShopData.findOneAndDelete({ productName });

    if (!deleted) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.json({ message: 'Product deleted successfully' });
  } catch (err) {
    console.error('Error deleting product:', err.message);
    res.status(500).json({ message: 'Server error while deleting product' });
  }
});


/**
 * TASK 1.8 - TOTAL UNITS SOLD, RETURNS, REVENUE FOR A SEASON
 * GET /api/season-summary?season=Summer
 */
app.get('/api/season-summary', async (req, res) => {
  try {
    const { season } = req.query;

    if (!season) {
      return res.status(400).json({ message: 'season query is required' });
    }

    const result = await FashionShopData.aggregate([
      { $match: { season } },
      {
        $group: {
          _id: '$season',
          totalUnitsSold: { $sum: '$unitsSold' },
          totalReturns: { $sum: '$returns' },
          totalRevenue: { $sum: '$revenue' },
        },
      },
    ]);

    if (result.length === 0) {
      return res.status(404).json({ message: 'No data for that season' });
    }

    res.json(result[0]);
  } catch (err) {
    console.error('Error getting season summary:', err.message);
    res.status(500).json({ message: 'Server error while getting summary' });
  }
});

/**
 * TASK 1.9 - FIRST 10 RECORDS WHERE UNITS SOLD > GIVEN VALUE FOR A SEASON
 * GET /api/top-products?season=Summer&minUnits=50
 */
app.get('/api/top-products', async (req, res) => {
  try {
    const { season, minUnits } = req.query;

    if (!season || !minUnits) {
      return res.status(400).json({
        message: 'season and minUnits query parameters are required',
      });
    }

    const minUnitsNumber = Number(minUnits);

    const products = await FashionShopData.find({
      season,
      unitsSold: { $gt: minUnitsNumber },
    })
      .limit(10);

    res.json(products);
  } catch (err) {
    console.error('Error getting top products:', err.message);
    res.status(500).json({ message: 'Server error while getting products' });
  }
});

/**
 * TASK 1.10 - PRODUCTS WHERE AVG RATING FOR A SEASON MEETS CONDITION
 * For simplicity, we treat each row as one rating entry.
 * GET /api/rating-filter?season=Summer&minRating=4
 */
app.get('/api/rating-filter', async (req, res) => {
  try {
    const { season, minRating } = req.query;

    if (!season || !minRating) {
      return res.status(400).json({
        message: 'season and minRating query parameters are required',
      });
    }

    const minRatingNumber = Number(minRating);

    // group by productName and season to compute average rating
    const result = await FashionShopData.aggregate([
      { $match: { season } },
      {
        $group: {
          _id: '$productName',
          productCategory: { $first: '$productCategory' },
          unitsSold: { $sum: '$unitsSold' },
          returns: { $sum: '$returns' },
          revenue: { $sum: '$revenue' },
          avgRating: { $avg: '$customerRating' },
          stockLevel: { $last: '$stockLevel' },
          trendScore: { $avg: '$trendScore' },
        },
      },
      {
        $match: {
          avgRating: { $gte: minRatingNumber },
        },
      },
    ]);

    res.json(result);
  } catch (err) {
    console.error('Error getting rating filter:', err.message);
    res.status(500).json({ message: 'Server error while getting rating data' });
  }
});




// start the server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});

