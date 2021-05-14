const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const app = express();

const urlencoded = require("body-parser/lib/types/urlencoded");

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));


app.get("/",(req,res)=>{
    res.sendFile(__dirname + "/signup.html");
})

app.listen(3000,()=>{
    console.log("Server is running on Port 3000.");
})
