// const mongoose = require('mongoose');

// const flipKartProductSchema = new mongoose.Schema({
//     id : String,
//     brand: String,
//     name: String,     
//     price: String,
//     rating: String,
//     image: String,
//     link: String
// },{
//     timestamps : true
// })

// const flipKartProductList = mongoose.model('flipkartdata', flipKartProductSchema);
// module.exports = flipKartProductList;

const mongoose = require('mongoose');

const flipkartSchema = mongoose.Schema(
  {
    image: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    rating: {
      type: String,
      required: true,
    },
    finalPrice: {
      type: String,
      required: true,
    },
    price: {
      type: String,
      required: true,
    },
    source: {
      type: String,
      required: true,
    },
    searchTag: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Flipkart', flipkartSchema);
