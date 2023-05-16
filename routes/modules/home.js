// 引用 Express 與 Express 路由器
const express = require('express')
const router = express.Router()
const Restaurant = require('../../models/Restaurant')
const restaurantData = require('./restaurantData');

// 定義首頁路由
// index
router.get('/', (req, res) => {
    Restaurant.find()
        .lean() // 把 Mongoose 的 Model 物件轉換成乾淨的 JavaScript 資料陣列
        .sort({ name: 'asc' })
        .then(restaurant => {
            restaurantData.setRestaurantResults(restaurant)
            res.render('index', { restaurant })
        }) // 將資料傳給 index 樣板
        .catch(error => console.error(error)) // 錯誤處理
})

// 匯出路由模組
module.exports = router