const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const urlencoded = require("body-parser/lib/types/urlencoded");

app.use(bodyParser.urlencoded({extended:true}));


app.get("/",(req,res)=>{
    res.send("<h1>Hello</h1>");
})

app.listen(3000,()=>{
    console.log("Server is running on Port 3000.");
})
