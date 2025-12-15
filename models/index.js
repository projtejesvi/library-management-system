const UserModel = require('./user-model');
const BookModel = require('./book-model');

module.exports = {
    UserModel,
    BookModel
};  

// Exporting the models for use in other parts of the application
// This allows us to import both models from a single file
// Example: const { UserModel, BookModel } = require('./models');

// This helps in maintaining cleaner and more organized code structure
// especially as the application scales and more models are added.
// It also promotes reusability and easier management of model imports.
// Each model is defined in its own file, and this index file serves
// as a central hub for accessing them.