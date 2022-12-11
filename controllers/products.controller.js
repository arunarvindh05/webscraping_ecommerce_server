const Amazon = require('../models/amazonProducts.model');
const Flipkart = require('../models/flipkartProducts.model');
const Snapdeal = require('../models/snapdealProducts.model');

const getProducts = async (req, res) => {
  try{
      const productsFromAmazon = await Amazon.find();
      const productsFromFlipkart = await Flipkart.find();
      const productsFromSnapdeal = await Snapdeal.find();
      res.status(201).send({
        amazon: productsFromAmazon,
        flipkart: productsFromFlipkart,
        snapdeal: productsFromSnapdeal,
      });
    }catch(err){
      res.status(500).send({message: 'Internal Server Error'})
    }
};
const getSearchedProducts = async (req, res) => {
  try{
    const product = req.query.product;
    const searchedFromAmazon = await Amazon.find({ searchTag: product });
    const searchedFromFlipkart = await Flipkart.find({ searchTag: product });
    const searchedFromSnapdeal = await Snapdeal.find({ searchTag: product });
    res.status(201).send({
      amazon: searchedFromAmazon,
      flipkart: searchedFromFlipkart,
      snapdeal: searchedFromSnapdeal,
    });
  }catch(err){
    res.status(500).send({message: 'Internal Server Error'})
  }
};

module.exports = { getProducts, getSearchedProducts };
