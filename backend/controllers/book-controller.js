const connection = require("../config");

//getting all books
const getAllBooks = async (req, res) => {
    try {
        const sql = "select * from books";
        connection.query(sql, (error, books) => {
            if (error) {
                return res.status(500).send({
                    success: false,
                    message: 'Error in getting books',
                    error
                })
            }
            res.status(200).send({
                success: true,
                books
            });
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'error while getting books',
            error
        })
    }
}

//this function will return a book detail 
const getBookById = async (req, res) => {
    try {
        const id = req.params.id;
        const sql = `select * from books where id=${id}`;
        connection.query(sql, (error, book) => {
            if (error) {
                return res.status(500).send({
                    success: false,
                    message: 'Error in getting a book',
                    error
                })
            }
            res.status(200).send({
                success: true,
                book
            });
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'error while getting a book',
            error
        })
    }
}


// adding a book in book table
const addBook = async (req, res) => {
    console.log("reqbody", req.body);
    try {
        const { title, author, description, price, photo, seller_ID} = req.body;
        const sql = `INSERT INTO books SET title='${title}}', 
                    author='${author}', description='${description}', 
                    price='${price}', photo='${photo}', seller_ID='${seller_ID}'`;
        connection.query(sql, (error, result) => {
            if (error) {
                return res.status(500).send({
                    success: false,
                    message: "error while adding book",
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
            message: 'error while adding a book',
            error
        })
    }
}

//this method will update a book detail with given id
//assuming that client is sending all field
const updateBook = async (req, res) => {
    try {
        const _id = req.params.id;
        const { title, author, description, price, photo, seller_ID } = req.body;
        const sql = `UPDATE books SET title='${title}', 
                    author='${author}', description='${description}', 
                    price='${price}', photo='${photo}', seller_ID='${seller_ID}'  WHERE id = ${_id}`;

        connection.query(sql, (error, result) => {
            if (error) {
                return res.status(404).send({
                    success: false,
                    message: "Error while updating book",
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
            message: 'error while updating a book',
            error
        })
    }
}

//delete a book on the basis of id 
const deleteBook = async (req, res) => {
    try {
        const id = req.params.id;
        const sql = `DELETE FROM books WHERE id = ${id}`;
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
            message: 'error while deleting a book',
            error
        })
    }
}

//Search books by search string

const getBookBySearchString = async (req, res) => {
    try {
        const searchString = req.params.searchString;
        const query = `select * from books where title like '%${searchString}%'`;
        connection.query(query, (error, books) => {
            if (error) {
                return res.status(400).send({
                    success: false,
                    message: "books not found",
                    error
                })
            }
            res.status(200).send({
                success: true,
                books
            })
        })
    } catch (error) {
        console.log(error);
        res.status(400).send({
            success: false,
            message: "Error while searching books "
        })
    }
}

// exporting all method so that we can use this 
//in anothe file

exports.getAllBooks = getAllBooks;
exports.getBookById = getBookById;
exports.addBook = addBook;
exports.updateBook = updateBook;
exports.deleteBook = deleteBook;
exports.getBookBySearchString = getBookBySearchString;
