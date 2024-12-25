const express = require("express");
const { registerUser, loginUser } = require("../controllers/auth-controller"); // Correct function name
const router = express.Router();

router.post("/register", registerUser); // Correct function usage
router.post("/login", loginUser);

module.exports = router;

