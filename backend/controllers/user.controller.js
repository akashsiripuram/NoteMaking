const User = require("../models/User")
const bcrypt = require("bcryptjs");

const createUser = async(req,res) => {
    const userdata = req.body;
    const newuser = new User(userdata);
    const salt = await bcrypt.genSalt(10)
    newuser.password = await bcrypt.hash(newuser.password,salt);
    await newuser.save();
    res.send("created user");
}

module.exports = {
    createUser
}