const express = require("express");
var router = express.Router();
const user = require("../controllers/UserController")
var bodyParser = require('body-parser')

//Login 
router.get('/index',user.index) ;
router.post('/create',(req,res)=>{
    console.log(req.body);
    var firstName = req.body.firstName;
    var lastName = req.body.lastName;
    var email = req.body.email;
    user.createNewUser(req,res);
});
router.post('/update',(req,res)=>{
    var id = req.body.id;
    var firstName = req.body.firstName;
    var lastName = req.body.lastName;
    var email = req.body.email;
    user.update(req,res);
});
router.post('/userInfo',(req,res)=>{
    var id = req.body.id;
    user.createNewUser(req,res);
});
router.post('/delete',(req,res)=>{
    var id = req.body.id;
    user.delete(req,res);
});
module.exports = router;