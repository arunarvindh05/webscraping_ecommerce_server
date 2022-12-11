const request = require('request-promise');
const cheerio = require('cheerio');
const mongoose = require('mongoose');

const Amazonlisting = require('../models/amazonProducts.model');
const flipkartlisting = require('../models/flipkartProducts.model');

const data = [];

    // connectToMongoDb = async () => {
    //     await mongoose.connect(
    //         'mongodb+srv://<username>:<password>@clusterscraping-eukyu.mongodb.net/test?retryWrites=true&w=majority',{ useNewUrlParser: true }
    //         );
    //     console.log('connected to MongoDb');
    // }

const searchItem = [
    'iphone 12',
    'iphone 11',
    'samsung m13',
    'samsung galaxy tab a8',
    'ipad mini',
    'ipad pro',
    'boat airdopes',
    'vivo y21',
    'redmi note 10',
    'oppo a15',
]

module.exports = {
    amazon : () => {
            for(index = 0; index <= searchItem.length; index++){
            amazonHeader = async () =>{
                
                    const result = await request.get('https://www.amazon.in/s?k='+searchItem[index]);
                    const $ = await cheerio.load(result);
                  
                    $('.s-asin').each((i,el)=> {
                        const id = $(el).attr('data-asin');
                        const brand = $(el).find('h5 .a-size-base-plus').text();
                        const name = $(el).find('h2 span').text();  
                        const price = $(el).find('.a-price-whole').text();
                        const rating = $(el).find('.a-spacing-top-micro span').attr('aria-label');
                        const image = $(el).find('.s-image').attr('src');
                        const link = 'https://www.amazon.in'+$(el).find('.a-link-normal').attr('href');
                        const datas = {id,brand,name,price,rating,image,link};
                        data.push(datas)
                         Amazonlisting.create({
                              id : id,
                              brand: brand,
                              name: name,
                              price:price,
                              rating:rating,
                              image:image,
                              link:link
                          })
                          .then((listing)=> {
                              console.log(listing)
                          }); 
                        
                    });
                
            return data;
        }
        flipKartHeader = async () =>{
                
            const result = await request.get('https://www.flipkart.com/search/?q='+searchItem[index]);
            const $ = await cheerio.load(result);
          
            $('.s-asin').each((i,el)=> {
                const id = $(el).attr('data-asin');
                const brand = $(el).find('h5 .a-size-base-plus').text();
                const name = $(el).find('h2 span').text();  
                const price = $(el).find('.a-price-whole').text();
                const rating = $(el).find('.a-spacing-top-micro span').attr('aria-label');
                const image = $(el).find('.s-image').attr('src');
                const link = 'https://www.amazon.in'+$(el).find('.a-link-normal').attr('href');
                const datas = {id,brand,name,price,rating,image,link};
                data.push(datas)
                flipkartlisting.create({
                      id : id,
                      brand: brand,
                      name: name,
                      price:price,
                      rating:rating,
                      image:image,
                      link:link
                  })
                  .then((listing)=> {
                      console.log(listing)
                  }); 
                
            });
        
    return data;
}
     
         
        
        const main = async () =>{
            const amazonHead = await amazonHeader();
            const flipKartHead = await flipKartHeader()
            console.log("Total scrapped : " + amazonHead.length);
          return amazonHead;
        }

        main();
        }
    } 
}