var express = require('express');
const jwt = require('jsonwebtoken');
var router = express.Router();

router.get('/dashboard',(req,res) => {
    if(req.cookies.auth){
        jwt.verify(req.cookies.auth.token, 'secret key',(err,verified)=>{
            if(err){
                res.json({err});
            }else{
                res.sendFile("/public/dashboard.html", {'root': './'});
            }
        });
    }else{
        res.sendFile("/public/login.html", {'root': './'});
    }
});

router.get('/rover',(req,res) => {
    if(req.cookies.auth){
        jwt.verify(req.cookies.auth.token, 'secret key',(err,verified)=>{
            if(err){
                res.json({err});
            }else{
                res.sendFile("/public/nav.html", {'root': './'});
            }
        });
    }else{
        res.sendFile("/public/login.html", {'root': './'});
    }
});

router.get('/roboticarm',(req,res) => {
    if(req.cookies.auth){
        jwt.verify(req.cookies.auth.token, 'secret key',(err,verified)=>{
            if(err){
                res.json({err});
            }else{
                res.sendFile("/public/roboticarm.html", {'root': './'});
            }
        });
    }else{
        res.sendFile("/public/login.html", {'root': './'});
    }
});

module.exports = router;