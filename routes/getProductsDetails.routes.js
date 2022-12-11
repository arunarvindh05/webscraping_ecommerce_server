// const express = require('express');
// const {amazonDataLoad} = require('../controllers/amazonProducts.controller')

// const router = express.Router();



// router.post('/amazon', amazonDataLoad);


// module.exports = router;

const express = require('express');
const router = express.Router();
const {
  getProducts,
  getSearchedProducts,
} = require('../controllers/products.controller');

router.get('/', getProducts);
router.get('/search', getSearchedProducts);

module.exports = router;
