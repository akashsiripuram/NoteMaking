const { createUser } = require("../controllers/user.controller");

const router = require("express").Router();

router.post("/signup", createUser);

module.exports = router;
