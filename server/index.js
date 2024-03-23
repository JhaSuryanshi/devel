require("dotenv").config();
const express = require("express");
const bodyParser = require('body-parser');
const index = express();
require("./db/conn");
const cors = require("cors");
const router = require("./routes/router");
const PORT = process.env.PORT || 3000;

index.use(bodyParser.json());
index.use(cors());
index.use(router);
index.use("/uploads",express.static("./uploads"));

index.get("/contact/Profile/:email", async(req, res) =>{
    try {
        const email = req.params.email;
        const getUser = await userdb.findOne({ email });
        res.send(getUser);
    } catch (e) { 
        res.status(500).send(e);
    }
})
// Server start
index.listen(PORT, () => {
    console.log(`Server started at Port Number ${PORT}`);
});
