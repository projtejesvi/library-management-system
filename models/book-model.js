const mongoose = require("mongoose");

const schema = mongoose.Schema;

// "id": "1",
// "name": "The Great Gatsby",
// "author": "F. Scott Fitzgerald",
// "genre": "Fiction",
// "price" : "10.99",
// "publisher": "Scribner"

const bookSchema = new schema({
    name: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        required: true,
    },
    genre: {
        type: String,
        required: true,
    },
    price: {
        type: String,
        required: true,
    },
    publisher: {
        type: String,
        required: true,
    }
}, 
{ 
    timestamps: true 
}
);

// const BookModel = mongoose.model("Book", bookSchema);

module.exports = mongoose.model("Book", bookSchema);