const mongoose = require('mongoose')
const { float } = require('webidl-conversions')
const Schema = mongoose.Schema
const restaurantSchema = new Schema({
    id: {
        type: Number,
        require: true
    },
    name: {
        type: String, // 資料型別是字串
        required: true // 這是個必填欄位
    },
    name_en: {
        type: String, // 資料型別是字串
        required: true // 這是個必填欄位
    },
    category: {
        type: String, // 資料型別是字串
        required: true // 這是個必填欄位
    },
    image: {
        type: String, // 資料型別是字串
        required: true // 這是個必填欄位
    }, location: {
        type: String, // 資料型別是字串
        required: true // 這是個必填欄位
    }, phone: {
        type: String, // 資料型別是字串
        required: true // 這是個必填欄位
    }, google_map: {
        type: String, // 資料型別是字串
        required: true // 這是個必填欄位
    }, rating: {
        type: Number, // 資料型別是浮點數
        required: true // 這是個必填欄位
    },
    description: {
        type: String, // 資料型別是字串
        required: true // 這是個必填欄位
    }
})

module.exports = mongoose.model('Restaurant', restaurantSchema)