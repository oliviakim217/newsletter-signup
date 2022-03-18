const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");
const app = express();
require("dotenv").config()

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

// HTTP Get for home route
app.get("/", function(req, res) {
    res.sendFile(__dirname + "/signup.html");
});

// HTTP Post for the home route
app.post("/", function(req, res) {
    const MAPI_KEY = process.env.API_KEY;
    const MLIST_ID = process.env.LIST_ID;
    const MAPI_SERVER = process.env.API_SERVER;
    const firstName = req.body.fName;
    const lastName = req.body.lName;
    const email = req.body.email;
    const data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: firstName,
                    LNAME: lastName
                }
            }
        ]
    };
    const jsonData = JSON.stringify(data);   
    const url = `https://${MAPI_SERVER}.api.mailchimp.com/3.0/lists/${MLIST_ID}`;
    const options = {
        method: "POST",
        auth: `olivia1:${MAPI_KEY}`
    };

    // Make a HTTP POST request to Mailchimp
    const request = https.request(url, options, function(response) {
        if (response.statusCode === 200) {
            res.sendFile(__dirname + "/success.html")
        } else {
            res.sendFile(__dirname + "/failure.html")
        }

        response.on("data", function(data) {
            console.log(JSON.parse(data));
        })
    });

    // Send jsonData to Mailchimp server
    request.write(jsonData);
    request.end();

});

// Failure route
app.post("/failure", function(req, res) {
    res.redirect("/");
})

// Main
app.listen(process.env.PORT || 3000, function() {
    console.log("Server is running on port 3000.")
})

