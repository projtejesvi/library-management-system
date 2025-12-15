const {BookModel, UserModel} = require("../models");
const IssuedBook = require("../dtos/book-dto");

// router.get('/',(req,res) => {
//     res.status(200).json({
//         success: true,
//         data: books
//     })
// })
exports.getAllBooks = async (req, res) => {
    try {
        const books = await BookModel.find();   
        res.status(200).json({
            success: true,
            data: books
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}


// router.get('/:id' ,(req,res) => {
//     const {id} = req.params;
//     const book = books.find((each) => each.id === id);
//     if(!book){
//         return res.status(404).json({
//             success: false,
//             data: `Book not found with id: ${id}`
//         })
//     }
//     res.status(200).json({
//         success: true,
//         data: book
//     })
// })
exports.getSingleBookById = async (req, res) => {
    const {id} = req.params;    
    try {
        const book = await BookModel.findById(id);
        if(!book){
            return res.status(404).json({       
                success: false,
                message: `Book not found with id: ${id}`
            });
        }   
        res.status(200).json({
            success: true,
            data: book
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}


// router.get('/issued/for-user', (req,res) => {
//     const usersWithIssuedBooks = users.filter((each) => {
//         if(each.issuedBook){
//             return each;
//         }
//     })
//     const issuedBooks = [];
//     usersWithIssuedBooks.forEach((each) => {
//         const book = books.find((book) => book.id === each.issuedBook);
//         book.issuedTo = each.name;
//         book.issuedDate = each.issuedDate;
//         book.returnDate = each.returnDate;
//         issuedBooks.push(book);
//     })
//     if(!issuedBooks === 0){
//         return res.status(404).json({
//             success: false,
//             message: "No Books issued"
//         })
//     }
//     res.status(200).json({
//         success: true,
//         data: issuedBooks
//     }) 
// })
exports.getAllIssuedBooks = async (req, res) => {
    try {
        const usersWithIssuedBooks = await UserModel.find({ 
            issuedBook: { $exists: true } 
        }).populate('issuedBook');  // Populate the issuedBook field with actual book data 

        const issuedBooks = usersWithIssuedBooks.map((each) => {
            return new IssuedBook(each); // Using DTO to format the issued book data
        });

        if (issuedBooks.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No Books issued"
            });
        }
        res.status(200).json({
            success: true,
            data: issuedBooks
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}   


// router.post('/',(req,res) => {
//     const {id, name, author, genre, price, publisher} = req.body;
//     if(!id || !name || !author || !genre || !price || !publisher){
//         return res.status(400).json({
//             success : false,
//             message : "Please provide all required fields"
//         })
//     }
//     const book = books.find((each) => each.id === id);
//     if(book){
//         return res.status(409).json({
//             success: false,
//             message: `Book Already Exists with id: ${id}`
//         })
//     }
//     const updatedBooks = books.push({id, name, author, genre, price, publisher});
//     res.status(201).json({
//         success: true,
//         data: updatedBooks,
//         message : "Book Registered Successfully"
//     })   
// })
exports.addNewBook = async (req, res) => {

    const { name, author, genre, price, publisher} = req.body;  
    if(!name || !author || !genre || !price || !publisher){
        return res.status(400).json({
            success : false,    
            message : "Please provide all required fields"
        });
    }   
    try {
        const newBook = new BookModel({ name, author, genre, price, publisher});
        await newBook.save();
        res.status(201).json({
            success: true,
            data: newBook,  
            message : "Book Registered Successfully"
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}


// router.put('/:id',(req,res) => {
//     const {id} = req.params;
//     const {data} = req.body;
//     const book = books.find((each) => each.id === id);
//     if(!book){
//         return res.status(409).json({
//             success: false,
//             message: `Book Not Found for id: ${id}`
//         })
//     }
//     const updatedBook = books.map((each) => {
//         if(each.id === id){
//             return {
//                 ...each,
//                 ...data
//             }
//         }
//         return each;
//     })
//     res.status(201).json({
//         success : true,
//         data : updatedBook,
//         message : "Book updated successfully" 
//     })
// })
exports.updateBookById = async (req, res) => {
    const {id} = req.params;
    const {data} = req.body;    

    if(!data || Object.keys(data).length === 0) {
        return res.status(400).json({
            success: false,
            message: "No data provided for update"
        });
    }

    //  METHOD 1: 
    // try {
    //     const book = await BookModel.findById(id);
    //     if(!book){
    //         return res.status(404).json({   
    //             success: false,
    //             message: `Book Not Found for id: ${id}`
    //         });
    //     }

    //     Object.assign(book, data);
    //     await book.save();

    //     res.status(200).json({  
    //         success : true,
    //         data : book,
    //         message : "Book updated successfully" 
    //     });
    // } catch (error) {
    //     res.status(500).json({
    //         success: false,
    //         message: error.message
    //     });
    // }

    // METHOD 2:
    try {
        const updatedBook = await BookModel.findOneAndUpdate(
            { _id: id },       
            data,              
            { new: true }     
        );
        if(!updatedBook){
            return res.status(404).json({   
                success: false,
                message: `Book Not Found for id: ${id}`
            });
        }
        res.status(200).json({
            success: true,
            data: updatedBook,
            message: "Book updated successfully"
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }   
};


// router.delete('/:id',(req,res) => {
//     const {id} = req.params;
//     const book = books.find((each) => each.id === id);
//     if(!book){
//         return res.status(409).json({
//             success: false,
//             message: `Book Not Found for id: ${id}`
//         })
//     }
//     const updatedBook = books.filter((each) => each.id !== id);
//     res.status(201).json({
//         success : true,
//         data: updatedBook,
//         message : "Book Deleted successfully" 
//     })
// })
exports.deleteBookById = async (req, res) => {
    const {id} = req.params;

    //Check if the book exists
    const book = await BookModel.findById(id);
    if(!book){
        return res.status(404).json({
            success: false,
            message: `Book Not Found for id: ${id}`
        });
    }

    try {
        const deletedBook = await BookModel.findByIdAndDelete(id);
        if(!deletedBook){
            return res.status(404).json({   
                success: false,
                message: `Book Not Found for id: ${id}`
            });
        }   
        res.status(200).json({
            success : true,
            data: deletedBook,
            message : "Book Deleted successfully" 
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};