const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/", function(req, res){
    res.sendFile(__dirname + "/signup.html");
});

app.post("/", function(req, res){
    var firstName = req.body.first;
    var lastName = req.body.last;
    var email = req.body.email;
    console.log(firstName, lastName, email);
    const data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: firstName,
                    LNAME: lastName,
                }
            }
        ]
    };

    const jsonData = JSON.stringify(data);

    const url = "https://us5.api.mailchimp.com/3.0/lists/051a7486df";
    const options = {
        method: "POST",
        auth: "Ishika:<API-KEY>"
    };

    const request = https.request(url, options, function(response){
        if(response.statusCode === 200){
            res.sendFile(__dirname + "/success.html");
        }
        else{
            res.sendFile(__dirname + "/failure.html");
        }
        
        response.on("data", function(data){
            console.log(JSON.parse(data));
        });
    });
    
    request.write(jsonData);
    request.end();
});

app.listen(process.env.PORT || 3000, function(){
    console.log("Server is running on port 3000");
});


// API Key
// 3975a6452349174977db5d36373319b6-us5

// Audience id /List id:
// 
