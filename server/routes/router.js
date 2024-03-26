
const express = require("express");
const router = new express.Router();
const controllers = require("../Controllers/userControllers");
const multer = require("multer");
const authenticate = require("../middleware/authenticate");
const jwt = require("jsonwebtoken");
const User = require('../models/usersSchema');
const moment = require("moment")
const imgconfig = multer.diskStorage({
    destination:(req,file,callback)=>{
        callback(null,"./uploads")
    },
    filename:(req,file,callback)=>{
        callback(null,`imgae-${Date.now()}. ${file.originalname}`)
    }
})


// img filter
const isImage = (req,file,callback)=>{
    if(file.mimetype.startsWith("image")){
        callback(null,true)
    }else{
        callback(new Error("only images is allowed"))
    }
}

const upload = multer({
    storage:imgconfig,
    fileFilter:isImage
});

//router.post("/contact",controllers.userpost);
const jwtSecret = "thisismysecretkey";
router.post('/contact', async (req, res) => {
    try {
        const {name, email, mobilenumber, message } = req.body;
        let existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const newUser = new User({
            name,
            email,
            mobilenumber,
            message
        });

        await newUser.save();
        
        //const token = jwt.sign({ userId: newUser._id }, jwtSecret, { expiresIn: '1h' });
        const token = jwt.sign({ userId: newUser._id }, jwtSecret, { expiresIn: '1h' });

        // Send response with token
        res.status(201).json({ message: 'User registered successfully', token });

    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});
// router.post("/Register",upload.single("photo"),async(req,res)=>{

//     const {filename} = req.file;
//     //const {fname} = req.body;

//     if(!filename){
//         res.status(400).json({status:400,message:"Please upload your image"})
//     }

//     try {

//         const date = moment(new Date()).format("YYYY-MM-DD");

//         const userdata = new users({
//             //fname:fname,
//             imgpath:filename,
//             date:date
//         });

//         const finaldata = await userdata.save();

//         res.status(201).json({status:201,finaldata});

//     } catch (error) {
//         res.status(500).json({status:500,error})
//     }
// });


router.post("/Register", upload.single("photo"), async (req, res) => {
    try {
        // Step 1: Check if the file upload works
        console.log("Uploaded file:", req.file);

        const { filename } = req.file;

        // Step 2: Verify the file path
        console.log("File path:", filename);

        // Step 3: Ensure database connection
        if (!mongoose.connection.readyState) {
            console.error("Database connection is not established.");
            return res.status(500).json({ status: 500, error: "Database connection error" });
        }

        // Step 4: Inspect the data being saved
        console.log("Data to be saved:", { imgpath: filename });

        // Step 5: Save data to the database
        const userdata = new User({ imgpath: filename });
        const savedUser = await userdata.save();

        console.log("User saved to database:", savedUser);

        res.status(201).json({ status: 201, message: "User registered successfully" });
    } catch (error) {
        // Step 5 (contd.): Check for errors during saving
        console.error("Error registering user:", error);
        res.status(500).json({ status: 500, error: error.message });
    }
});


// user logout

router.get("/userlogout",authenticate,async(req,res)=>{
    try {
        req.rootUser.tokens =  req.rootUser.tokens.filter((curelem)=>{
            return curelem.token !== req.token
        });

        res.clearCookie("usercookie",{path:"/"});

        req.rootUser.save();

        res.status(201).json({status:201})

    } catch (error) {
        res.status(401).json({status:401,error})
    }
})

module.exports = router;