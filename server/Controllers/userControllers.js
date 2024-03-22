const User = require("../models/usersSchema");

exports.userpost = async (req, res) => {
  try {
    const { name, email, mobilenumber, message } = req.body;

    if (!name || !email || !mobilenumber || !message) {
      return res.status(400).json({ error: "All input is required" });
    }
    
    const preuser = await User.findOne({ email: email });
    if (preuser) {
      return res.status(400).json({ error: "This user already exists in our database" });
    }

    const userData = new User({
      name,
      email,
      mobilenumber,
      message
    });
    await userData.save();

    res.status(200).json(userData);
  } catch (error) {
    console.log("Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
