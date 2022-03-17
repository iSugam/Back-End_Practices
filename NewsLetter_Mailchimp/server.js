const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https")
const app = express();
const port = 3000;

app.use(express.static("public"))
app.use(bodyParser.urlencoded({extended: true}))
app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html")
})

app.post("/", (req, res) => {
    const firstName = req.body.fName ;
    const lastName = req.body.lName ;
    const email = req.body.email ;

  const user = {
    members : [
        {
            email_address : email,
            status : "subscribed",
            merge_fields : {
                FNAME : firstName,
                LNAME : lastName
            }
        }
    ]
  }

  const jsonData = JSON.stringify(user);

  const mailchimpUrl = 'https://us14.api.mailchimp.com/3.0/lists/5cc2e91ea9' ;

  const options = {
      method: 'POST',
      auth : 'sugam:59bf500ed06fc8c511ab78032022c242-us14'
  }

  const newRequest = https.request(mailchimpUrl, options , (response) => {
    response.on('data', d => {
        console.log(JSON.parse(d));
        if(response.statusCode === 200) {
            res.sendFile(__dirname + "/success.html")
            }
        else res.sendFile(__dirname + "/failure.html")
        })
  })
  newRequest.write(jsonData)
 newRequest.end()
})

app.listen(port, () => {
    console.log("Server Is running on port " + port);
})


// mailchimp API
// 59bf500ed06fc8c511ab78032022c242-us14

// List Id
// 5cc2e91ea9