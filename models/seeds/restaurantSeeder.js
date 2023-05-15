const mongoose = require('mongoose')
const Restaurant = require('../restaurant') // 載入 restaurant model
const restaurantSeed = require('/Users/uscer/Desktop/AC/Semester2-3_S3A7/restaurant.json')
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection

db.on('error', () => {
    console.log('mongodb error!')
})

db.once('open', () => {
    console.log('mongodb connected!')
    restaurantSeed.forEach(restaurant => {
        Restaurant.create(restaurant)
    });
    console.log('done')
})