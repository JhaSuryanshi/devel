const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/usersSchema');

// Load JWT secret key from environment variables
const jwtSecret = process.env.JWT_SECRET;

// router.post('/contact', async (req, res) => {
//     try {
//         const {name, email, mobilenumber, message } = req.body;
//         let existingUser = await User.findOne({ email });
//         if (existingUser) {
//             return res.status(400).json({ message: 'User already exists' });
//         }

//         const newUser = new User({
//             name,
//             email,
//             mobilenumber,
//             message
//         });

//         await newUser.save();
        
//         //const token = jwt.sign({ userId: newUser._id }, jwtSecret, { expiresIn: '1h' });
//         const token = jwt.sign({ userId: newUser._id }, jwtSecret, { expiresIn: '1h' });

//         // Send response with token
//         res.status(201).json({ message: 'User registered successfully', token });

//     } catch (error) {
//         console.error('Error registering user:', error);
//         res.status(500).json({ message: 'Internal Server Error' });
//     }
// });

const authenticate = async(req,res,next)=>{

    try {
        const token = req.headers.authorization;
        
        const verifytoken = jwt.verify(token,keysecret);
        
        const rootUser = await User.findOne({_id:verifytoken._id});
        
        if(!rootUser) {throw new Error("user not found")}

        req.token = token
        req.rootUser = rootUser
        req.userId = rootUser._id

        next();

    } catch (error) {
        res.status(401).json({status:401,message:"Unauthorized no token provide"})
    }
}

module.exports = authenticate;
