const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const app = express();
const https = require("https");

const urlencoded = require("body-parser/lib/types/urlencoded");
const { options } = require("request");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/signup.html");
});

app.post("/", (req, res) => {
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const email = req.body.email;

  const data = {
    members: [
      {
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME: firstName,
          LNAME: lastName,
        },
      },
    ],
  };

  const jsonData = JSON.stringify(data);

  const url = "https://usX.api.mailchimp.com/3.0/lists/api_key";

  const options = {
      method: "POST",
      auth: "username:api_key"
  }

  const request = https.request(url,options,(response)=>{
    const statusCode = response.statusCode
    if (statusCode === 200){
        res.sendFile(__dirname + "/success.html")
    }else{
        res.sendFile(__dirname + "/failure.html")
    }
    response.on("data", function(data){
        console.log(JSON.parse(data));
    })

  })
  
  request.write(jsonData)
  request.end()
});

app.get("/failure",function(req,res){
    res.redirect("/")
})

app.listen(3000, () => {
  console.log("Server is running on Port 3000.");
});


