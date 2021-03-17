const express = require('express');
const mongoose = require("mongoose");
var bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const cors = require('cors');

const port = process.env.PORT || 3000;
const url = process.env.MONGODB_URI || 'mongodb://localhost/robot-userauth';
const app = express();

app.use(bodyParser.urlencoded({extended : true})); 
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

app.use(express.static(__dirname+'/public/'));
app.use('/static', express.static(__dirname + '/public/assets'))

app.get('/', (req,res)=>{
    res.sendFile(__dirname+"/public/login.html");
});


mongoose.connect(url,{ useNewUrlParser: true }, (err) => {
    err ? console.log("Error connecting to database!") : console.log("Successfully connected to the database!");
});

app.use('/user', require('./Routes/user'));
app.use('/menu', require('./Routes/menu'));

app.listen(port, () => console.log(`Robot web suite listening at ${port}`))
