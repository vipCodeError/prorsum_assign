const express = require("express");
const router = express.Router();
const UserController = require("../controllers/UserController");
const jwtVerify = require("../middleware/jwt_verify");

router.post("/createUser",  UserController.createUser);
router.post("/getUserInfo", jwtVerify.authenticateJWT, UserController.getUserInfo);
router.post("/loginUser",   UserController.loginUser);

module.exports = router;