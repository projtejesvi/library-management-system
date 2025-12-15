const express = require("express");
const { users } = require("../data/users.json");

const { UserModel, BookModel } = require("../models");
const { getAllUsers, getSingleUserById, createNewUser, updateUserById, deleteUserById, getSubscriptionDetailsById } = require("../controllers/user-controller");

const router = express.Router();

/**
 * Route: /users
 * Method: GET
 * Description: Get all the list of users in the system
 * Access: Public
 * Parameters: None
 */
router.get('/',getAllUsers);


/**
 * Route: /users/:id
 * Method: GET
 * Description: Get a user by their ID
 * Access: Public
 * Parameters: id
 */
router.get('/:id',getSingleUserById);

/**
 * Route: /users
 * Method: POST
 * Description: Create/Register a new user
 * Access: Public
 * Parameters: None
 */
router.post('/',createNewUser)

/**
 * Route: /users/:id
 * Method: PUT
 * Description:  Updating a user by their ID
 * Access: Public
 * Parameters: ID
 */
router.put('/:id',updateUserById);

/**
 * Route: /users/:id
 * Method: DELETE
 * Description:  Deleting a user by their ID 
 * Access: Public
 * Parameters: ID
 */
router.delete('/:id',deleteUserById);

/**
 * Route: /users/subscription-details/:id
 * Method: GET
 * Description: Get subscription details of a user by their ID
 * Access: Public
 * Parameters: id
 */
router.get('/subscription-details/:id', getSubscriptionDetailsById);


module.exports = router;