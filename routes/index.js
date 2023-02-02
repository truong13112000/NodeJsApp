const express = require("express");
var router = express.Router();
const userRoute = require('./user')

//Login 
router.use('/user',userRoute)

module.exports = router;