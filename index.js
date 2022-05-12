//Libraries
const express = require("express");
const bp= require("body-parser");
const path = require("path");
const accessories = require("./Laptopsandphonesacess.js");
const electronics = require("./Lapsandphones.js");
//middlewares
var app = express();
app.use(bp.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')))
app.use("/accessories", accessories);
app.use("/electronics",electronics);
//Home route
app.get('/',(req,res)=>{
    res.render('index');
});



//app listing port
app.listen(4000,()=>{
    console.log("server is started at port 4000");
});