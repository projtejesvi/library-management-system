const express = require("express");
const { books } = require("../data/books.json");
const { users } = require("../data/users.json");

const router = express.Router();

/**
 * Route: /books
 * Method: GET
 * Description: Get all the list of books in the system
 * Access: Public
 * Parameters: None
 */
router.get('/',(req,res) => {
    res.status(200).json({
        success: true,
        data: books
    })
})



/**
 * Route: /books/:id
 * Method: GET
 * Description: Get a book by its ID
 * Access: Public
 * Parameters: id
 */
router.get('/:id' ,(req,res) => {

    const {id} = req.params;
    const book = books.find((each) => each.id === id);

    if(!book){
        return res.status(404).json({
            success: false,
            data: `Book not found with id: ${id}`
        })
    }

    res.status(200).json({
        success: true,
        data: book
    })
})


/**
 * Route: /books
 * Method: POST
 * Description: Create/Register a new book
 * Access: Public
 * Parameters: None
 */
router.post('/',(req,res) => {
    // "id": "15",
    // "name": "Brave New World",
    // "author": "Aldous Huxley",
    // "genre": "Dystopian",
    // "price" : "9.89",
    // "publisher": "Chatto & Windus"

    const {id, name, author, genre, price, publisher} = req.body;

    if(!id || !name || !author || !genre || !price || !publisher){
        return res.status(400).json({
            success : false,
            message : "Please provide all required fields"
        })
    }

    const book = books.find((each) => each.id === id);
    if(book){
        return res.status(409).json({
            success: false,
            message: `Book Already Exists with id: ${id}`
        })
    }

    const updatedBooks = books.push({id, name, author, genre, price, publisher});

    res.status(201).json({
        success: true,
        data: updatedBooks,
        message : "Book Registered Successfully"
    })   

})


/**
 * Route: /books/:id
 * Method: PUT
 * Description:  Updating a book by its ID
 * Access: Public
 * Parameters: ID
 */
router.put('/:id',(req,res) => {

    const {id} = req.params;
    const {data} = req.body;

    const book = books.find((each) => each.id === id);
    if(!book){
        return res.status(409).json({
            success: false,
            message: `Book Not Found for id: ${id}`
        })
    }

    const updatedBook = books.map((each) => {
        if(each.id === id){
            return {
                ...each,
                ...data
            }
        }
        return each;
    })


    res.status(201).json({
        success : true,
        data : updatedBook,
        message : "Book updated successfully" 
    })
})

/**
 * Route: /books/:id
 * Method: DELETE
 * Description:  Deleting a book by their ID 
 * Access: Public
 * Parameters: ID
 */
router.delete('/:id',(req,res) => {

    const {id} = req.params;

    const book = books.find((each) => each.id === id);
    if(!book){
        return res.status(409).json({
            success: false,
            message: `Book Not Found for id: ${id}`
        })
    }
    

    const updatedBook = books.filter((each) => each.id !== id);

    res.status(201).json({
        success : true,
        data: updatedBook,
        message : "Book Deleted successfully" 
    })
})

/**
 * Route: /books/issued/for-user
 * Method: GET
 * Description:  Get all issued books
 * Access: Public
 * Parameters: None
 */
router.get('/issued/for-user', (req,res) => {

    const usersWithIssuedBooks = users.filter((each) => {
        if(each.issuedBook){
            return each;
        }
    })

    const issuedBooks = [];

    usersWithIssuedBooks.forEach((each) => {
        const book = books.find((book) => book.id === each.issuedBook);

        book.issuedTo = each.name;
        book.issuedDate = each.issuedDate;
        book.returnDate = each.returnDate;

        issuedBooks.push(book);
    })

    if(!issuedBooks === 0){
        return res.status(404).json({
            success: false,
            message: "No Books issued"
        })
    }

    res.status(200).json({
        success: true,
        data: issuedBooks
    }) 
})

module.exports = router;