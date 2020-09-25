const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");
const { response } = require("express");

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("public"));

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/signup.html")
});

app.post("/", function (req, res) {
    const email = req.body.email;
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;

    const data = {
        members: [{
            email_address: email,
            status: "subscribed",
            merge_fields: {
                FNAME: firstName,
                LNAME: lastName
            }
        }]
    }


    json_data = JSON.stringify(data);

    const url = "https://us2.api.mailchimp.com/3.0/lists/4b1164f1c9";
    const options = {
        method: "POST",
        auth: "AhmedKhalid:caed0b9a7c548b8fcac98f98915b8d65-us2"
    };
    const Request = https.request(url, options, function (response) {
        response.on("data", function (data) {



        });
        if (response.statusCode === 200) {
            res.sendFile(__dirname + "/success.html");
            console.log(response.statusCode);
        }
        else {
            res.sendFile(__dirname + "/failure.html");
            console.log(response.statusCode);
        }
    });
    Request.write(json_data);
    Request.end();

});

app.post("/failure", function (req, res) {
    res.redirect("/");
});


app.listen(3000, function () {
    console.log("Server is running on port 3000");
});

// API KEY
// caed0b9a7c548b8fcac98f98915b8d65-us2
// List ID
// 4b1164f1c9