const connection = require("../config");

//getting all orders
const getAllOrders = async (req, res) => {
    try {
        const sql = "select * from orders";
        connection.query(sql, (error, orders) => {
            if (error) {
                return res.status(500).send({
                    success: false,
                    message: 'Error in getting orders',
                    error
                })
            }
            res.status(200).send({
                success: true,
                orders
            });
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'error while getting orders',
            error
        })
    }
}

//this function will return a order detail 
const getOrderById = async (req, res) => {
    try {
        const id = req.params.id;
        const sql = `select * from orders where id=${id}`;
        connection.query(sql, (error, order) => {
            if (error) {
                return res.status(500).send({
                    success: false,
                    message: 'Error in getting a order detail',
                    error
                })
            }
            res.status(200).send({
                success: true,
                order
            });
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'error while getting a order detail',
            error
        })
    }
}


// adding a order in orders table
const addOrder = async (req, res) => {
    console.log("reqbody", req.body);
    try {
        const { customer_ID, book_ID, order_date } = req.body;
        const sql = `INSERT INTO orders SET customer_ID='${customer_ID}', 
                    book_ID='${book_ID}', order_date='${order_date}'`;
        connection.query(sql, (error, result) => {
            if (error) {
                return res.status(500).send({
                    success: false,
                    message: "error while adding a order",
                    error
                })
            }
            res.status(200).send({
                success: true,
                result
            });
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'error while adding a order',
            error
        })
    }
}

//this method will update a order detail to given id
//assuming that client is sending details of all field
const updateOrder = async (req, res) => {
    try {
        const _id = req.params.id;
        const { customer_ID, book_ID, order_date } = req.body;
        const sql = `UPDATE orders SET customer_ID='${customer_ID}', 
                    book_ID='${book_ID}', order_date='${order_date}' WHERE id = ${_id}`;

        connection.query(sql, (error, result) => {
            if (error) {
                return res.status(404).send({
                    success: false,
                    message: "Error while updating a order",
                })
            }
            res.status(201).send({
                success: true,
                result
            });
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'error while updating a order',
            error
        })
    }
}

//delete a customer with given id 
const deleteOrder = async (req, res) => {
    try {
        const id = req.params.id;
        const sql = `DELETE FROM orders WHERE id = ${id}`;
        connection.query(sql, (error, result) => {
            if (error) {
                return res.status(404).send({
                    success: false,
                    message: 'id not found',
                    error
                })
            }
            res.status(201).send({
                success: true,
                result
            });
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'error while deleting a order',
            error
        })
    }
}

//Sort order by book price in increasing price
const sortByPriceAscending = async (req, res) => {
    try {
        const sql = `SELECT o.id, o.book_ID, b.title, b.price, b.photo, o.order_date  
            FROM orders o
            JOIN books b ON o.book_ID = b.id 
            ORDER BY b.price`;
        connection.query(sql, (error, result) => {
            if (error) {
                return res.status(404).send({
                    success: false,
                    message: 'orders not sorted successfully',
                    error
                })
            }
            res.status(201).send({
                success: true,
                result
            });
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'error while getting sorted orders',
            error
        })
    }
}

// sort orders in decreasing order of price
const sortByPriceDescending = async (req, res) => {
    try {
        const sql = `SELECT o.id, o.book_ID, b.title, b.price, b.photo, o.order_date  
            FROM orders o
            JOIN books b ON o.book_ID = b.id 
            ORDER BY b.price DESC`;
        connection.query(sql, (error, result) => {
            if (error) {
                return res.status(404).send({
                    success: false,
                    message: 'orders not sorted successfully',
                    error
                })
            }
            res.status(201).send({
                success: true,
                result
            });
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'error while getting sorted orders',
            error
        })
    }
}

//sort orders by purchasing date
const getLatestOrderFirst = async (req, res) => {
    try {
        const sql = `SELECT o.id, o.book_ID, b.title, b.price, b.photo, o.order_date  
            FROM orders o
            JOIN books b ON o.book_ID = b.id 
            ORDER BY o.order_date DESC`;
        connection.query(sql, (error, result) => {
            if (error) {
                return res.status(404).send({
                    success: false,
                    message: 'orders not sorted successfully',
                    error
                })
            }
            res.status(201).send({
                success: true,
                result
            });
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'error while getting sorted orders by date',
            error
        })
    }
}

// sort orders on the basis of date, old orders first
const getOldestOrderFirst = async (req, res) => {
    try {
        const sql = `SELECT o.id, o.book_ID, b.title, b.price, b.photo, o.order_date  
            FROM orders o
            JOIN books b ON o.book_ID = b.id 
            ORDER BY o.order_date`;
        connection.query(sql, (error, result) => {
            if (error) {
                return res.status(404).send({
                    success: false,
                    message: 'orders not sorted successfully',
                    error
                })
            }
            res.status(201).send({
                success: true,
                result
            });
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'error while getting sorted orders by date',
            error
        })
    }
}

//Search orders by Book name
const searchOrderByBookName = async (req, res) => {
    try {
        const { bookName } = req.params;
        console.log("bookName", bookName);
        const sql = `SELECT o.id, o.book_ID, b.title, b.price, b.photo, o.order_date  
            FROM orders o
            JOIN books b ON o.book_ID = b.id 
            where b.title LIKE '%${bookName}%'`;
        connection.query(sql, (error, result) => {
            if (error) {
                return res.status(404).send({
                    success: false,
                    message: 'orders not searched by bookName',
                    error
                })
            }
            res.status(201).send({
                success: true,
                result
            });
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'error while searching orders by book name',
            error
        })
    }
}

// search all orders between given price range
const searchOrderByPriceRange = async (req, res) => {
    try {
        const { startPrice, endPrice } = req.query;
        const sql = `SELECT o.id, o.book_ID, b.title, b.price, b.photo, o.order_date  
            FROM orders o
            JOIN books b ON o.book_ID = b.id 
            where b.price BETWEEN '${startPrice}' AND '${endPrice}'`;
        connection.query(sql, (error, result) => {
            if (error) {
                return res.status(404).send({
                    success: false,
                    message: 'orders not searched by book price range',
                    error
                })
            }
            res.status(201).send({
                success: true,
                result
            });
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'error while searching orders by book price range',
            error
        })
    }

}

//search orders by purchasing date range
const searchOrderByDateRange = async (req, res) => {
    console.log("search by date ragne called");
    try {
        const { startDate, endDate } = req.query;
        console.log("date", startDate, endDate);
        const sql = `SELECT o.id, o.book_ID, b.title, b.price, b.photo, o.order_date  
            FROM orders o
            JOIN books b ON o.book_ID = b.id 
            where o.order_date BETWEEN '${startDate}' AND '${endDate}'`;
        connection.query(sql, (error, result) => {
            if (error) {
                return res.status(404).send({
                    success: false,
                    message: 'orders not searched by purchasing date range',
                    error
                }) 
            }
            res.status(201).send({
                success: true,
                result
            });
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'error while searching orders by purchasing date range',
            error
        })
    }
}




// exporting all method so that we can use this in another file

exports.getAllOrders = getAllOrders;
exports.getOrderById = getOrderById;
exports.addOrder = addOrder;
exports.updateOrder = updateOrder;
exports.deleteOrder = deleteOrder;
exports.sortByPriceAscending = sortByPriceAscending;
exports.sortByPriceDescending = sortByPriceDescending;
exports.getLatestOrderFirst = getLatestOrderFirst;
exports.getOldestOrderFirst = getOldestOrderFirst;
exports.searchOrderByBookName = searchOrderByBookName;
exports.searchOrderByPriceRange = searchOrderByPriceRange
exports.searchOrderByDateRange = searchOrderByDateRange