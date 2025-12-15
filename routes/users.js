const express = require("express");
const { users } = require("../data/users.json");

const router = express.Router();

/**
 * Route: /users
 * Method: GET
 * Description: Get all the list of users in the system
 * Access: Public
 * Parameters: None
 */
router.get('/',(req,res) => {
    res.status(200).json({
        success: true,
        data: users
    })
})


/**
 * Route: /users/:id
 * Method: GET
 * Description: Get a user by their ID
 * Access: Public
 * Parameters: id
 */
router.get('/:id',(req,res) => {

    const {id} = req.params;
    const user = users.find((each) => each.id === id);

    if(!user){
        return res.status(404).json({
            success: false,
            message: `User not found ${id}`
        });
    }
    res.status(200).json({
        success: true,
        data: user
    })
})

/**
 * Route: /users
 * Method: POST
 * Description: Create/Register a new user
 * Access: Public
 * Parameters: None
 */
router.post('/',(req,res) => {
    // "id": "9",
    // "name": "Ian",
    // "surname": "Clark",
    // "email": "user9@email.com",
    // "subscriptionType": "Basic",
    // "subscriptionDate": "05/20/2022"
    const {id, name, surname, email, subscriptionType, subscriptionDate} = req.body;

    if(!id || !name || !surname || !email || !subscriptionType || !subscriptionDate){
        return res.status(400).json({
            success : false,
            message : "Please provide all required fields"
        })
    }

    const user = users.find((each) => each.id === id);
    if(user){
        return res.status(409).json({
            success: false,
            message: `User Already Exists with id: ${id}`
        })
    }

    const updatedUsers = users.push({id, name, surname, email, subscriptionType, subscriptionDate});

    res.status(201).json({
        success: true,
        data: updatedUsers,
        message : "User Created Successfully"
    })   

})

/**
 * Route: /users/:id
 * Method: PUT
 * Description:  Updating a user by their ID
 * Access: Public
 * Parameters: ID
 */
router.put('/:id',(req,res) => {

    const {id} = req.params;
    const {data} = req.body;

    const user = users.find((each) => each.id === id);
    if(!user){
        return res.status(409).json({
            success: false,
            message: `User Not Found for id: ${id}`
        })
    }

    const updatedUser = users.map((each) => {
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
        data : updatedUser,
        message : "User updated successfully" 
    })
})

/**
 * Route: /users/:id
 * Method: DELETE
 * Description:  Deleting a user by their ID 
 * Access: Public
 * Parameters: ID
 */
router.delete('/:id',(req,res) => {

    const {id} = req.params;

    const user = users.find((each) => each.id === id);
    if(!user){
        return res.status(409).json({
            success: false,
            message: `User Not Found for id: ${id}`
        })
    }
    

    const updatedUser = users.filter((each) => each.id !== id);

    res.status(201).json({
        success : true,
        data: updatedUser,
        message : "User Deleted successfully" 
    })
})

router.get('/subscription-details/:id', (req,res) => {
    const { id } = req.params;

    const user = users.find((each) => each.id === id);
    if (!user) {
        return res.status(404).json({
                success: false,
                message: `User Not Found for id: ${id}`
            });
    }
    
    const getDateInDays = (data = '') => {
        let date;
        if (data) {
            date = new Date(data);
        } else {
            date = new Date();
        }
        let days = Math.floor(date / (1000 * 60 * 60 * 24));
        return days;
    };
    
    const subscriptionType = (date) => {
        if (user.subscriptionType === "Basic") {
            return date + 90;
        } else if (user.subscriptionType === "Standard") {
            return date + 180;
        } else {
            return date + 365;
        }
    };
    
    
    let returnDate = getDateInDays(user.returnDate);
    let currentDate = getDateInDays();
    let subscriptionDate = getDateInDays(user.subscriptionDate);
    let subscriptionExpiration = subscriptionType(subscriptionDate);
    
    const data = {
        ...user._doc,
        subscriptionExpired: subscriptionExpiration < currentDate,
        subscriptionDaysLeft: subscriptionExpiration - currentDate,
        daysLeftForExpiration: returnDate - currentDate,
        returnDate: returnDate < currentDate ? "Book return date has passed" : returnDate,
        fine: returnDate < currentDate ? subscriptionExpiration < currentDate ? 200 : 100 : 0
    }
    
    res.status(200).json({
        success: true,
        data
    });
});


module.exports = router;