const express = require("express");
const {
    getAllOrders,
    getOrderById,
    addOrder,
    updateOrder,
    deleteOrder,
    sortByPriceAscending,
    sortByPriceDescending,
    getLatestOrderFirst,
    getOldestOrderFirst,
    searchOrderByBookName,
    searchOrderByPriceRange,
    searchOrderByDateRange
} = require("../controllers/order-controller");
const orderRouter = express.Router();

orderRouter.get("/get-orders", getAllOrders);
orderRouter.get('/get-order/:id', getOrderById);
orderRouter.post('/add-order', addOrder);
orderRouter.put('/update-order/:id', updateOrder);
orderRouter.delete("/delete-order/:id", deleteOrder);
orderRouter.get('/sort-orders/price-inc', sortByPriceAscending);
orderRouter.get('/sort-orders/price-desc', sortByPriceDescending);
orderRouter.get('/sort-orders/latest-first', getLatestOrderFirst)
orderRouter.get('/sort-orders/oldest-first', getOldestOrderFirst);
orderRouter.get('/search-order/by-book-name/:bookName', searchOrderByBookName);
orderRouter.get('/search-order/by-price-range', searchOrderByPriceRange);
orderRouter.get('/search-order/by-date-range', searchOrderByDateRange);




module.exports = orderRouter;