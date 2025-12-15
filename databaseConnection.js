const mongoose = require('mongoose');

// Function to connect to MongoDB
function dbConnection() {
    const DB_URL = process.env.MONGO_URI;

    mongoose.connect(DB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });

    const db = mongoose.connection;


    // mongoose.connect(DB_URL, {
    //     useNewUrlParser: true,
    //     useUnifiedTopology: true
    // });

    // const db = mongoose.connection;
    
    db.on("error", (error) => { console.error("Error connecting to MongoDB:", error); });
    db.once("open", function() { console.log("Connected to MongoDB database successfully!"); });
}

module.exports = dbConnection;