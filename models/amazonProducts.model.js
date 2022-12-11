// const mongoose = require('mongoose');

// const productSchema = new mongoose.Schema({
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

// const productlist = mongoose.model('amazondata', productSchema);
// module.exports = productlist;

const mongoose = require('mongoose');

const amazonSchema = mongoose.Schema(
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

module.exports = mongoose.model('Amazon', amazonSchema);
