require('dotenv').config();
const express = require('express');
const cors = require('cors');
const CronJob = require('node-cron');


//Import all routes
const productRoute = require('./routes/getProductsDetails.routes');
//Import DB;
const db = require('./db/connect');
const getProducts = require('./schedular/getProducts');


const app = express();

//Establishing the DB connection.
db();

app.use(cors());
app.use(express.json());

app.use('/api/products', productRoute);

app.get('/', (req, res) => {
    res.status(200).send('Welcome to my WebScrapping ECommerce Application')
})



const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`App is running on PORT ${PORT}`)
    getProducts()
    const job = CronJob.schedule('* * */12 * *', getProducts);
})