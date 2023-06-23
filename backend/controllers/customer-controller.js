const connection = require("../config");

//getting all customer
const getAllCustomers = async (req, res) => {
    try {
        const sql = "select * from customers";
        connection.query(sql, (error, customers) => {
            if (error) {
                return res.status(500).send({
                    success: false,
                    message: 'Error in getting customers',
                    error
                })
            }
            res.status(200).send({
                success: true,
                customers
            });
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'error while getting sellers',
            error
        })
    }
}

//this function will return a customer detail 
const getCustomerById = async (req, res) => {
    try {
        const id = req.params.id;
        const sql = `select * from customers where id=${id}`;
        connection.query(sql, (error, customer) => {
            if (error) {
                return res.status(500).send({
                    success: false,
                    message: 'Error in getting a customer',
                    error
                })
            }
            res.status(200).send({
                success: true,
                customer
            });
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'error while getting a customer',
            error
        })
    }
}


// adding a customer in sellers table
const addCustomer = async (req, res) => {
    console.log("reqbody", req.body);
    try {
        const { name, email, phone, address,password } = req.body;
        const sql = `INSERT INTO customers SET name='${name}', 
                    email='${email}', phone='${phone}', 
                    address='${address}', password='${password}'`;
        connection.query(sql, (error, result) => {
            if (error) {
                return res.status(500).send({
                    success: false,
                    message: "error while adding customer",
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
            message: 'error while adding a customer',
            error
        })
    }
}

//this method will update a customer detail with given id
//assuming that client is sending detail all field
const updateCustomer = async (req, res) => {
    try {
        const _id = req.params.id;
        const { name, email, phone, address, password } = req.body;
        const sql = `UPDATE customers SET name='${name}', 
                    email='${email}', phone='${phone}', 
                    address='${address}', password='${password}'  WHERE id = ${_id}`;

        connection.query(sql, (error, result) => {
            if (error) {
                return res.status(404).send({
                    success: false,
                    message: "Error while updating customer",
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
            message: 'error while updating a customer',
            error
        })
    }
}

//delete a customer with given id 
const deleteCustomer = async (req, res) => {
    try {
        const id = req.params.id;
        const sql = `DELETE FROM customers WHERE id = ${id}`;
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
            message: 'error while deleting a customer',
            error
        })
    }
}



// exporting all method so that we can use this in another file

exports.getAllCustomers = getAllCustomers;
exports.getCustomerById = getCustomerById;
exports.addCustomer = addCustomer;
exports.updateCustomer = updateCustomer;
exports.deleteCustomer = deleteCustomer;

