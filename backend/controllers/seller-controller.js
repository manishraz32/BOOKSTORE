const connection = require("../config");

//getting all sellers
const getAllSellers = async (req, res, next) => {
    try {
        const sql = "select * from sellers";
        connection.query(sql, (err, sellers) => {
            if (err) {
                return res.status(500).send({
                    success: false,
                    message: 'Error in getting sellers',
                    err
                })
            }
            res.status(200).send({
                success: true,
                sellers
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

//this function will return a book detail 
const getSellerById = async (req, res) => {
    try {
        const id = req.params.id;
        const sql = `select * from sellers where id=${id}`;
        connection.query(sql, (err, seller) => {
            if (err) {
                return res.status(500).send({
                    success: false,
                    message: 'Error in getting a seller',
                    err
                })
            }
            res.status(200).send({
                success: true,
                seller
            });
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'error while getting a seller',
            error
        })
    }
}


// adding a seller in sellers table
const addSeller = async (req, res) => {
    console.log("reqbody", req.body);
    try {
        const { name, email, phone, address, password } = req.body;
        const sql = `INSERT INTO sellers SET name='${name}', 
                    email='${email}', phone='${phone}', 
                    address='${address}', password='${password}'`;
        connection.query(sql, (error, result) => {
            if (error) {
                return res.status(500).send({
                    success: false,
                    message: "error while adding seller",
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
            message: 'error while adding a seller',
            error
        })
    }
}

//this method will update a seller detail with given id
//assuming that client is sending detail all field
const updateSeller = async (req, res) => {
    try {
        const _id = req.params.id;
        const { name, email, phone, address, password } = req.body;
        const sql = `UPDATE sellers SET name='${name}', 
                    email='${email}', phone='${phone}', 
                    address='${address}', password='${password}'  WHERE id = ${_id}`;

        connection.query(sql, (error, result) => {
            if (error) {
                return res.status(404).send({
                    success: false,
                    message: "Error while updating seller",
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
            message: 'error while updating a seller',
            error
        })
    }
}

//delete a seller with given id 
const deleteSeller = async (req, res) => {
    try {
        const id = req.params.id;
        const sql = `DELETE FROM sellers WHERE id = ${id}`;
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
            message: 'error while deleting a seller',
            error
        })
    }
}



// exporting all method so that we can use this 
//in anothe file

exports.getAllSellers = getAllSellers;
exports.getSellerById = getSellerById;
exports.addSeller = addSeller;
exports.updateSeller = updateSeller;
exports.deleteSeller = deleteSeller;

