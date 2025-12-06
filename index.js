const express = require('express');

// importing routes
const usersRouter = require("./routes/users");
const booksRouter = require("./routes/books");

const app = express();

const PORT = 8081;

app.use(express.json());

app.get('/', (req,res) => {
    res.status(200).json({
        message: "Home Page :-"
    })
})


// using routes
app.use("/users", usersRouter);
app.use("/books", booksRouter);


// app.all('*', (req,res) => {
//     res.status(500).json({
//         message: "Not built yet"
//     })
// })

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
})