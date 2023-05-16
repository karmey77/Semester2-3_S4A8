const express = require('express')
const router = express.Router()
const Restaurant = require('../../models/Restaurant')
const restaurantData = require('./restaurantData');

// sorting
router.get('/:sortMethod', (req, res) => {
    const sortMethod = req.params.sortMethod
    const refName = {
        asc: 'A -> Z',
        desc: 'Z -> A',
        category: '類別',
        rating: '評分',
        location: '地區'
    }
    const currentRestaurantResults = restaurantData.getRestaurantResults()

    if (sortMethod === 'asc') {
        let restaurant = currentRestaurantResults.sort(function (a, b) {
            const nameA = a.name.toUpperCase(); // ignore upper and lowercase
            const nameB = b.name.toUpperCase(); // ignore upper and lowercase
            if (nameA < nameB) {
                return -1;
            }
            if (nameA > nameB) {
                return 1;
            }
            // names must be equal
            return 0;
        })
        res.render('index', { restaurant, sort: refName[sortMethod] })

    } else if (sortMethod === 'desc') {
        let restaurant = currentRestaurantResults.sort(function (a, b) {
            const nameA = a.name.toUpperCase(); // ignore upper and lowercase
            const nameB = b.name.toUpperCase(); // ignore upper and lowercase
            if (nameA < nameB) {
                return 1;
            }
            if (nameA > nameB) {
                return -1;
            }
            // names must be equal
            return 0;
        })
        res.render('index', { restaurant, sort: refName[sortMethod] })

    } else {
        let restaurant = currentRestaurantResults.sort(function (a, b) {

            if (sortMethod !== 'rating') {
                const keyA = a[sortMethod].toUpperCase()
                const keyB = b[sortMethod].toUpperCase()
                if (keyA < keyB) {
                    return 1;
                }
                if (keyA > keyB) {
                    return -1;
                }
                // names must be equal
                return 0

            } else if (sortMethod === 'rating') {
                const keyA = a[sortMethod]
                const keyB = b[sortMethod]

                if (keyA < keyB) {
                    return 1;
                }
                if (keyA > keyB) {
                    return -1;
                }
                // names must be equal
                return 0
            }
        })
        res.render('index', { restaurant, sort: refName[sortMethod] })
    }
})

module.exports = router;
