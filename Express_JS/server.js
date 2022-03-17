const express = require("express");
const fs = require('fs')
const app = express();
const bodyparser = require("body-parser")
const port = 3010;

app.use(express.static(__dirname + "/public"))
app.use(bodyparser.urlencoded({extended : true}))

app.get("/", (req, res) => {
    res.sendFile(__dirname +"/index.html")
})

app.post("/", (req, res) => {
    var num1 = Number(req.body.num1);
    var num2 = Number(req.body.num2);

    var result = num1 + num2;
    res.send(({result}))
})


app.listen(port, () => {
    console.log(`app is listening to ${port}`);
})