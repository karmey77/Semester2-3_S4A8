// 引用 Express 與 Express 路由器
const express = require('express')
const router = express.Router()
const Restaurant = require('../../models/Restaurant') // 引用 Todo model

// create
router.get('/new', (req, res) => {
    return res.render('new')
})

router.post('/', (req, res) => {
    const restaurant = req.body
    return Restaurant.create(restaurant)     // 存入資料庫
        .then(() => res.redirect('/')) // 新增完成後導回首頁
        .catch(error => console.log(error))
})

// detail
router.get('/:restaurant_id', (req, res) => {
    const id = req.params.restaurant_id
    return Restaurant.find()
        .lean()
        .then((restaurants) => restaurants.filter(restaurant => restaurant._id.toString() === id))
        .then((restaurant) => restaurant[0])
        .then((restaurant) => res.render('show', { restaurant: restaurant }))
        .catch(error => console.log(error))
})

// edit
router.get('/:restaurant_id/edit', (req, res) => {
    const id = req.params.restaurant_id
    return Restaurant.find()
        .lean()
        .then((restaurants) => restaurants.filter(restaurant => restaurant._id.toString() === id))
        .then((restaurant) => restaurant[0])
        .then((restaurant) => res.render('edit', { restaurant: restaurant }))
        .catch(error => console.log(error))
})

router.put('/:restaurant_id', (req, res) => {
    console.log(req.params.restaurant_id)
    console.log(req.body)
    const id = req.params.restaurant_id
    const name = req.body.name
    const name_en = req.body.name_en
    const category = req.body.category
    const location = req.body.location
    const google_map = req.body.google_map
    const phone = req.body.phone
    const description = req.body.description
    const image = req.body.image

    return Restaurant.findById(id)
        .then(restaurant => {
            restaurant.name = name
            restaurant.name_en = name_en
            restaurant.category = category
            restaurant.location = location
            restaurant.google_map = google_map
            restaurant.phone = phone
            restaurant.description = description
            restaurant.image = image

            return restaurant.save()
        })
        .then(() => res.redirect(`/restaurants/${id}`))
        .catch(error => console.log(error))
})

// delete
router.delete('/:id', (req, res) => {
    const id = req.params.id
    return Restaurant.findById(id)
        .then(restaurant => {
            return restaurant.deleteOne()
        })
        .then(() => res.redirect('/'))
        .catch(error => console.log(error))
})

module.exports = router