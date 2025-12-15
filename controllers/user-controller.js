const { UserModel, BookModel } = require("../models");


// router.get('/',(req,res) => {
//     res.status(200).json({
//         success: true,
//         data: users
//     })
// })
exports.getAllUsers = async (req, res) => {
    try {
        const users = await UserModel.find();

        if(!users || users.length === 0){
            return res.status(404).json({
                success: false,
                message: "No users found in the database"
            });
        }
        res.status(200).json({
            success: true,
            data: users
        });

    } catch (error) {
        res.status(500).json({
            success: false, 
            message: error.message
        });
    }   
}


// router.get('/:id',(req,res) => {
//     const {id} = req.params;
//     const user = users.find((each) => each.id === id);
//     if(!user){
//         return res.status(404).json({
//             success: false,
//             message: `User not found ${id}`
//         });
//     }
//     res.status(200).json({
//         success: true,
//         data: user
//     })
// })
exports.getSingleUserById = async (req, res) => {
    const {id} = req.params;
    try {
        const user = await UserModel.findById(id);
        // const user = await UserModel.findById({_id: id});
        // const user = await UserModel.findOne({_id: id});

        if(!user){
            return res.status(404).json({   
                success: false,
                message: `User not found with id: ${id}`
            });
        }
        res.status(200).json({
            success: true,
            data: user
        });
    } catch (error) {
        res.status(500).json({
            success: false, 
            message: error.message
        });
    }   
}


// router.post('/',(req,res) => {
//     // "id": "9",
//     // "name": "Ian",
//     // "surname": "Clark",
//     // "email": "user9@email.com",
//     // "subscriptionType": "Basic",
//     // "subscriptionDate": "05/20/2022"
//     const {id, name, surname, email, subscriptionType, subscriptionDate} = req.body;

//     if(!id || !name || !surname || !email || !subscriptionType || !subscriptionDate){
//         return res.status(400).json({
//             success : false,
//             message : "Please provide all required fields"
//         })
//     }

//     const user = users.find((each) => each.id === id);
//     if(user){
//         return res.status(409).json({
//             success: false,
//             message: `User Already Exists with id: ${id}`
//         })
//     }

//     const updatedUsers = users.push({id, name, surname, email, subscriptionType, subscriptionDate});

//     res.status(201).json({
//         success: true,
//         data: updatedUsers,
//         message : "User Created Successfully"
//     })   

// })
exports.createNewUser = async (req, res) => {
    const { name, surname, email, subscriptionType, subscriptionDate} = req.body;  
    if(!name || !surname || !email || !subscriptionType || !subscriptionDate){
        return res.status(400).json({
            success : false,    
            message : "Please provide all required fields"
        });
    }
    try {
        const newUser = new UserModel({ name, surname, email, subscriptionType, subscriptionDate});
        await newUser.save();
        res.status(201).json({
            success: true,
            data: newUser,  
            message : "User Created Successfully"
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
//     const user = users.find((each) => each.id === id);
//     if(!user){
//         return res.status(409).json({
//             success: false,
//             message: `User Not Found for id: ${id}`
//         })
//     }
//     const updatedUser = users.map((each) => {
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
//         data : updatedUser,
//         message : "User updated successfully" 
//     })
// })
exports.updateUserById = async (req, res) => {
    const {id} = req.params;
    const {data} = req.body;

    if(!data || Object.keys(data).length === 0){
        return res.status(400).json({
            success: false,
            message: "Please provide data to update"
        });
    }

    // Find the user by ID and update with new data
    try {
        const user = await UserModel.findById(id);
        if(!user){
            return res.status(404).json({
                success: false,
                message: `User Not Found for id: ${id}`
            });
        }
        
        const updatedUser = await UserModel.findByIdAndUpdate(id, data, { new: true }); // new: true to return the updated document
        
        res.status(200).json({
            success: true,
            data: updatedUser,
            message: "User updated successfully"
        });
    } catch (error) {
        res.status(500).json({
            success: false, 
            message: error.message
        });
    }
}

// router.delete('/:id',(req,res) => {
//     const {id} = req.params;
//     const user = users.find((each) => each.id === id);
//     if(!user){
//         return res.status(409).json({
//             success: false,
//             message: `User Not Found for id: ${id}`
//         })
//     }
//     const updatedUser = users.filter((each) => each.id !== id);
//     res.status(201).json({
//         success : true,
//         data: updatedUser,
//         message : "User Deleted successfully" 
//     })
// })
exports.deleteUserById = async (req, res) => {
    const {id} = req.params;
    try {
        const user = await UserModel.findById(id);
        if(!user){
            return res.status(404).json({
                success: false,
                message: `User Not Found for id: ${id}`
            });
        }   
        await UserModel.findByIdAndDelete(id);

        res.status(200).json({          
            success: true,
            message: "User Deleted successfully"
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}


exports.getSubscriptionDetailsById = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await UserModel.findById(id);
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
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};