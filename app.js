// 加入這段 code, 僅在非正式環境時, 使用 dotenv
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

// 載入 express 並建構應用程式伺服器
const express = require('express')
const app = express()
const mongoose = require('mongoose') // 載入 mongoose
const exphbs = require('express-handlebars');
const Restaurant = require('./models/Restaurant')
const bodyParser = require('body-parser')

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true }) // 設定連線到 mongoDB

// 用 app.use 規定每一筆請求都需要透過 body-parser 進行前置處理
app.use(bodyParser.urlencoded({ extended: true }))
app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

// 取得資料庫連線狀態
const db = mongoose.connection
// 連線異常
db.on('error', () => {
    console.log('mongodb error!')
})
// 連線成功
db.once('open', () => {
    console.log('mongodb connected!')
})

// require packages used in the project
const port = 3003

app.use(express.static('public'))

// index
app.get('/', (req, res) => {
    Restaurant.find()
        .lean() // 把 Mongoose 的 Model 物件轉換成乾淨的 JavaScript 資料陣列
        .then(restaurant => res.render('index', { restaurant })) // 將資料傳給 index 樣板
        .sort({ _id: 'asc' })
        .catch(error => console.error(error)) // 錯誤處理
})

// search
app.get('/search', (req, res) => {
    const keyword = req.query.keyword
    return Restaurant.find()
        .lean()
        .then((restaurants) => restaurants.filter(restaurant => {
            return `${restaurant.name}${restaurant.category}${restaurant.name_en}`
                .toLowerCase()
                .includes(keyword.toLowerCase())
        }))
        .then((restaurants) => res.render('index', { restaurant: restaurants, keyword }))
        .catch(error => console.log(error))
})

// create
app.get('/restaurants/new', (req, res) => {
    console.log("This is create")
    return res.render('new')
})

app.post('/restaurants', (req, res) => {
    const restaurant = req.body
    return Restaurant.create(restaurant)     // 存入資料庫
        .then(() => res.redirect('/')) // 新增完成後導回首頁
        .catch(error => console.log(error))
})

// detail
app.get('/restaurants/:restaurant_id', (req, res) => {
    const id = req.params.restaurant_id
    return Restaurant.find()
        .lean()
        .then((restaurants) => restaurants.filter(restaurant => restaurant._id.toString() === id))
        .then((restaurant) => restaurant[0])
        .then((restaurant) => res.render('show', { restaurant: restaurant }))
        .catch(error => console.log(error))
})

// edit
app.get('/restaurants/:restaurant_id/edit', (req, res) => {
    const id = req.params.restaurant_id
    return Restaurant.find()
        .lean()
        .then((restaurants) => restaurants.filter(restaurant => restaurant._id.toString() === id))
        .then((restaurant) => restaurant[0])
        .then((restaurant) => res.render('edit', { restaurant: restaurant }))
        .catch(error => console.log(error))
})

app.post('/restaurants/:restaurant_id/edit', (req, res) => {
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
app.post('/restaurants/:id/delete', (req, res) => {
    const id = req.params.id
    return Restaurant.findById(id)
        .then(restaurant => {
            return restaurant.deleteOne()
        })
        .then(() => res.redirect('/'))
        .catch(error => console.log(error))
})

// start and listen on the Express server
app.listen(port, () => {
    console.log(`Express is listening on localhost:${port}`)
})