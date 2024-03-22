
const express = require("express");
const router = new express.Router();
const controllers = require("../Controllers/userControllers");
const multer = require("multer");
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

router.post("/contact",controllers.userpost);
router.post("/Register",upload.single("photo"),async(req,res)=>{

    const {filename} = req.file;
    //const {fname} = req.body;

    if(!filename){
        res.status(401).json({status:401,message:"Please upload your image"})
    }

    try {

        const date = moment(new Date()).format("YYYY-MM-DD");

        const userdata = new users({
            //fname:fname,
            imgpath:filename,
            date:date
        });

        const finaldata = await userdata.save();

        res.status(201).json({status:201,finaldata});

    } catch (error) {
        res.status(401).json({status:401,error})
    }
});


module.exports = router;