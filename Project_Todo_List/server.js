const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const app = express();



app.use(express.static("public"))

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded(({extended: false})));
const items = [];
const workItems = []
app.get("/", (req, res) => {

    const date = new Date();

    const day = {
        weekday: "long",
        month: "long",
        year: "numeric"
    }

     day = date.toLocaleString("en-US", day)

    res.render("list", {listTitle: day, listItem: items})
})

app.post("/", (req, res) => {
    const item = req.body.newItem;

    if(req.body === "/") {
        items.push(item)
        res.redirect("/")
    }
    else {
        workItems.push(item)
        res.redirect("/work")
    }

})

app.get("/work", (req, res) => {
    res.render('list', {listTitle: "Work Day", listItem: workItems})
})
app.get("/about", (req, res) => {
    res.render('about')
})


app.listen(5000, () => {
    console.log("Server started on port 5000");
})