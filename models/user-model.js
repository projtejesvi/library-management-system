const mongoose = require("mongoose");

const schema = mongoose.Schema;

// {
//     "id": "1",
//     "name": "Alice",
//     "surname": "Johnson",
//     "email": "user1@email.com",
//     "issuedBook": "1",
//     "issuedDate": "04/01/2022",
//     "returnDate": "04/21/2022",
//     "subscriptionType": "Basic",
//     "subscriptionDate": "03/01/2022"
// },

const userSchema = new schema({
    name: {
        type: String,
        required: true,
    },
    surname: {
        type: String,
        required: true, 
    },
    email: {
        type: String,
        required: true, 
    },
    issuedBook: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Book",
        required: false,
    },
    issuedDate: {
        type: String,   
        required: false,
    },
    returnDate: {
        type: String,
        required: false,
    },
    subscriptionType: {
        type: String,
        required: true,
    },
    subscriptionDate: {
        type: String,
        required: true,
    }
}, 
{ 
    timestamps: true 
}
);

module.exports = mongoose.model("User", userSchema);