const express = require("express");
const { books } = require("../data/books.json");
const { users } = require("../data/users.json");

const { UserModel, BookModel } = require("../models");
const { getAllBooks, getSingleBookById, getAllIssuedBooks, addNewBook, updateBookById, deleteBookById } = require("../controllers/book-controller");

const router = express.Router();

/**
 * Route: /books
 * Method: GET
 * Description: Get all the list of books in the system
 * Access: Public
 * Parameters: None
 */
router.get('/',getAllBooks);



/**
 * Route: /books/:id
 * Method: GET
 * Description: Get a book by its ID
 * Access: Public
 * Parameters: id
 */
router.get('/:id', getSingleBookById);


/**
 * Route: /books
 * Method: POST
 * Description: Create/Register a new book
 * Access: Public
 * Parameters: None
 */
router.post('/', addNewBook)


/**
 * Route: /books/:id
 * Method: PUT
 * Description:  Updating a book by its ID
 * Access: Public
 * Parameters: ID
 */
router.put('/:id', updateBookById);

/**
 * Route: /books/:id
 * Method: DELETE
 * Description:  Deleting a book by their ID 
 * Access: Public
 * Parameters: ID
 */
router.delete('/:id', deleteBookById);

/**
 * Route: /books/issued/for-user
 * Method: GET
 * Description:  Get all issued books
 * Access: Public
 * Parameters: None
 */
router.get('/issued/for-user', getAllIssuedBooks);


module.exports = router;