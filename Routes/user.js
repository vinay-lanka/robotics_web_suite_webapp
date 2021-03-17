var express = require('express');
var bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
var router = express.Router();
const user = require('../Models/user');

router.post('/signup',(req,res)=>{
    // console.log(req.body);
    bcrypt.hash(req.body.password,10, (err,hash)=>{
        if(err){
            res.send("Error generating hash");
        }else{
            let user1 = new user({
                Name: req.body.name,
                Email : req.body.email,
                Password : hash,
            });
            user1.save()
            .then(data => {
                res.send({Status: 1, Message: "User created."})
            })
            .catch(err => {
                res.send({Status: 0, Message: "Failed Sign up - "+err})
            })
        }
    })
});


router.post('/login',(req,res) => {
    var LoginEmail = req.body.email;
    var LoginPassword = req.body.password;
    // console.log(req.body);
    user.findOne({Email: LoginEmail},(err,obj) => {
        if(err){
            res.send({Status: 0, Message: "Failed due to " + err})
        }
        else{
            if(obj === null){
                console.log("1");
                res.send({Status: 0, Message: "Username/Password is invalid"})
            }else{
                bcrypt.compare(LoginPassword,obj.Password,(err,result) => {
                    if (err){
                        res.send({Status: 0, Message: "Error in server "+err})
                    }else{
                        if(result){
                            const token = jwt.sign({
                                id: obj._id
                            },'secret key',{expiresIn:'1h'})
                            

                            res.cookie('auth',{
                                token: token,
                                type: 'user',
                                email: obj.Email,
                                name: obj.Name
                            },{ maxAge: 900000, httpOnly: true })
                            res.send({Status: 1, Message: "User Authenticated", Data: obj, token: token})
                        }else{
                            console.log("2");
                            res.send({Status: 0, Message: "Username/Password is invalid!"})
                        }
                    }
                })
            }
        }
    })
})

router.get('/logout',(req,res) => {
    res.clearCookie('auth');
    res.redirect('/');
});


module.exports = router;