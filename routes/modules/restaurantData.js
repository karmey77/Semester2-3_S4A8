let restaurantResults = []

function setRestaurantResults(results) {
    restaurantResults = results
}

function getRestaurantResults() {
    return restaurantResults
}

module.exports = {
    setRestaurantResults,
    getRestaurantResults
}