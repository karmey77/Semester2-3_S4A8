// 引用 Express 與 Express 路由器
const express = require('express')
const router = express.Router()
const Restaurant = require('../../models/Restaurant')
const restaurantData = require('./restaurantData')

// search
router.get('/', (req, res) => {
    const keyword = req.query.keyword
    return Restaurant.find()
        .lean()
        .sort({ name: 'asc' })
        .then((restaurants) => restaurants.filter(restaurant => {
            return `${restaurant.name}${restaurant.category}${restaurant.name_en}`
                .toLowerCase()
                .includes(keyword.toLowerCase())
        }))
        .then((restaurants) => {
            restaurantData.setRestaurantResults(restaurants)
            res.render('index', { restaurant: restaurants, keyword })
        })
        .catch(error => console.log(error))
})

module.exports = router
