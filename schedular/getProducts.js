const cheerio = require('cheerio');
const puppeteer = require('puppeteer');
const Amazon = require('../models/amazonProducts.model');
const Flipkart = require('../models/flipkartProducts.model');
const Snapdeal = require('../models/snapdealProducts.model');

const productArray = [
  'iphone 14',
  'iphone 13',
  'samsung m13',
  'samsung galaxy tab a8',
  'ipad mini',
  'ipad pro',
  'vivo y21'
];

async function getProductDataFromAmazon(url, productSearch) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url);
  let html = await page.evaluate(() => document.body.innerHTML);
  let products = [];
  const $ = cheerio.load(html);
  const productSource = 'Amazon';

  $(`[data-component-type='s-search-result']`, html).each(function () {
    let productImageUrl = $(this).find('img').attr('src');
    let productTitle = $(this).find('h2').text();
    let productRating = $(this).find('.a-icon-alt').text();
    let finalProductPrice = $(this).find('.a-price-whole').text();
    let productPrice = $(this)
      .find(`[data-a-color='secondary']`)
      .find('.a-offscreen')
      .text();
      console.log("getProductDataFromAmazon "+productTitle,finalProductPrice,productPrice)
    if (productImageUrl === '' || productImageUrl === undefined) {
      productImageUrl = 'No Image Found';
    }

    if (productTitle === '' || productTitle === undefined) {
      productTitle = 'No Title Found';
    }

    if (productRating === '' || productRating === undefined) {
      productRating = 'No Ratings';
    }

    if (finalProductPrice === '' || finalProductPrice === undefined) {
      finalProductPrice = 'No Final Price Found';
    }

    if (productPrice === '' || productPrice === undefined) {
      productPrice = 'No MRP Found';
    }

    products.push({
      image: productImageUrl,
      title: productTitle,
      rating: productRating,
      finalPrice: finalProductPrice,
      price: productPrice,
      source: productSource,
      searchTag: productSearch,
    });
  });
  return products;
}

async function getProductDataFromFlipkart(url, productSearch) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setDefaultNavigationTimeout(0);
  await page.goto(url);
  let html = await page.evaluate(() => document.body.innerHTML);
  let products = [];
  const $ = cheerio.load(html);
  const productSource = 'Flipkart';

  $(`[data-id]`, html).each(function () {
    console.log("testing snapdeal")
    let productImageUrl = $(this).find('.CXW8mj').find('img').attr('src');
    let productTitle =
      $(this).find('._4rR01T').text() || $(this).find('.s1Q9rs').text();
    let productRating = $(this).find('._3LWZlK').text();
    let finalProductPrice = $(this).find('._30jeq3').text();
    let productPrice = $(this).find(`._3I9_wc`).text();
    console.log("getProductDataFromFlipkart "+productTitle,finalProductPrice,productPrice)
    if (productImageUrl === '' || productImageUrl === undefined) {
      productImageUrl = 'No Image Found';
    }

    if (productTitle === '' || productTitle === undefined) {
      productTitle = 'No Title Found';
    }

    if (productRating === '' || productRating === undefined) {
      productRating = 'No Ratings';
    }

    if (finalProductPrice === '' || finalProductPrice === undefined) {
      finalProductPrice = 'No Final Price Found';
    }

    if (productPrice === '' || productPrice === undefined) {
      productPrice = 'No MRP Found';
    }

    products.push({
      image: productImageUrl,
      title: productTitle,
      rating: productRating,
      finalPrice: finalProductPrice,
      price: productPrice,
      source: productSource,
      searchTag: productSearch,
    });
  });
  return products;
}

async function getProductDataFromSnapdeal(url, productSearch) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url);
  let html = await page.evaluate(() => document.body.innerHTML);
  let products = [];
  const $ = cheerio.load(html);
  const productSource = 'Snapdeal';

  $('.product-tuple-listing', html).each(function () {
    let productImageUrl = $(this)
      .find('.product-tuple-image')
      .find('.picture-elem')
      .find('img')
      .attr('src');
    let productTitle = $(this).find('.product-title').text();
    let productRating = $(this).find('.filled-stars').attr('style');
    let finalProductPrice = $(this).find('.product-price').text();
    let productPrice = $(this).find(`.product-desc-price`).text();
    console.log("getProductDataFromSnapdeal "+productTitle,finalProductPrice,productPrice)
    if (productImageUrl === '' || productImageUrl === undefined) {
      productImageUrl = 'No Image Found';
    }

    if (productTitle === '' || productTitle === undefined) {
      productTitle = 'No Title Found';
    }

    if (productRating === '' || productRating === undefined) {
      productRating = 'No Ratings';
    }

    if (finalProductPrice === '' || finalProductPrice === undefined) {
      finalProductPrice = 'No Final Price Found';
    }

    if (productPrice === '' || productPrice === undefined) {
      productPrice = 'No MRP Found';
    }

    products.push({
      image: productImageUrl,
      title: productTitle,
      rating: productRating,
      finalPrice: finalProductPrice,
      price: productPrice,
      source: productSource,
      searchTag: productSearch,
    });
  });

  return products;
}

async function getProductOne(prod) {
  let productSearch = prod;
  const amazonProductString = productSearch.split(' ').join('+');
  const flipkartProductString = productSearch.split(' ').join('%20');
  const category = 'electronics';

  const amazonUrl = `https://www.amazon.in/s?k=${amazonProductString}&i=${category}`;
  const flipkartUrl = `https://www.flipkart.com/search?q=${flipkartProductString}`;
  const snapdealUrl = `https://www.snapdeal.com/search?keyword=${flipkartProductString}&sort=rlvncy`;

  const amazonData = await getProductDataFromAmazon(amazonUrl, productSearch);

  const amazonDataExists = await Amazon.findOne({ searchTag: productSearch });
  if (amazonDataExists) {
    const deleteAmazonDocs = await Amazon.deleteMany({
      searchTag: productSearch,
    });
  }
  const amazonDbUpdate = await Amazon.insertMany(amazonData);

  const flipkartData = await getProductDataFromFlipkart(
    flipkartUrl,
    productSearch
  );

  const flipkartDataExists = await Flipkart.findOne({
    searchTag: productSearch,
  });
  if (flipkartDataExists) {
    const deleteFlipkartDocs = await Flipkart.deleteMany({
      searchTag: productSearch,
    });
  }
  const flipkartDbUpdate = await Flipkart.insertMany(flipkartData);

  const snapdealData = await getProductDataFromSnapdeal(
    snapdealUrl,
    productSearch
  );

  const snapdealDataExists = await Snapdeal.findOne({
    searchTag: productSearch,
  });
  if (snapdealDataExists) {
    const deleteSnapdealDocs = await Snapdeal.deleteMany({
      searchTag: productSearch,
    });
  }
  const snapdealDbUpdate = await Snapdeal.insertMany(snapdealData);
}

async function getProducts() {
  for (product of productArray) {
    const productData = await getProductOne(product);
  }
}

module.exports = getProducts;
