const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

// HTTP Get to home route
app.get("/", function(req, res) {
    res.sendFile(__dirname + "/signup.html");
});

// HTTP Post
app.post("/", function(req, res) {
    var firstName = req.body.fName;
    var lastName = req.body.lName;
    var email = req.body.email;
    console.log(firstName, lastName, email);
});


app.listen(3000, function() {
    console.log("Server is running on port 3000.")
})