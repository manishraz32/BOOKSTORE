const express = require("express");
const bookRouter = express.Router();
const { 
    getAllBooks,
    getBookById,
    addBook,
    updateBook,
    deleteBook,
    getBookBySearchString,
 } = require("../controllers/book-controller");

bookRouter.get("/", getAllBooks);
bookRouter.get('/:id', getBookById);
bookRouter.post('/', addBook);
bookRouter.put('/:id', updateBook);
bookRouter.delete("/:id", deleteBook);
bookRouter.get('/search/:searchString', getBookBySearchString);

module.exports = bookRouter;