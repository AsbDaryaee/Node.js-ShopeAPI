const dotenv = require('dotenv').config();

const connectDB = require('../db/connect')
const Product = require('../models/product')

const jsonProduct = require('./products.json')



const start = async () => {
    try {
        connectDB(process.env.MONGO_URI)
        Product.deleteMany()
        Product.create(jsonProduct)
        console.log('Finished...');
        process.exit(0)
    } catch (error) {
        console.log(error);
        process.exit(1)
    }
}


start()