const express = require('express');
const router = express.Router();
const {
  getProducts,
  getSearchedProducts,
} = require('../controllers/products.controller');

router.get('/', getProducts);
router.get('/search', getSearchedProducts);

module.exports = router;
