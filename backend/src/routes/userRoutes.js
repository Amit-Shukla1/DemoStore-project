const express = require("express");
const router = express.Router();
const { register, login } = require("../controllers/userController");
const { validateEmail, validatePassword } = require("../middleware/validation");

router.post("/register", validateEmail, validatePassword, register);
router.post("/login", validateEmail, validatePassword, login);

module.exports = router;
