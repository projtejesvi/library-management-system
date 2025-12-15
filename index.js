const express = require('express');

// 1.
// Importing dotenv to manage environment variables
const dotenv = require("dotenv");

// 2.
// Import db connection module
const dbConnection = require("./databaseConnection");

const usersRouter = require("./routes/users");
const booksRouter = require("./routes/books");

// 3.
// Configuring dotenv to load variables from .env file
dotenv.config();

const app = express();

// 4.
// Establishing database connection
dbConnection();

const PORT = 8081;

app.use(express.json());

app.get('/', (req,res) => {
    res.status(200).json({
        message: "Home Page :-"
    })
})


app.use("/users", usersRouter);
app.use("/books", booksRouter);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
})