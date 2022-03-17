const express = require('express');
const app = express();
const bodyParser = require("body-parser")
const port = 3000;
const https = require('https')

app.use(bodyParser.urlencoded({extended : true}));



app.get('/', (req, res) => {
    res.sendFile(__dirname + "/index.html") //To get index.html file
})

app.post("/", (req, res) => {

    let city = req.body.search; // Name of the input from HTML Form
    let unit= req.body.metricule; // Name of the Selection from HTML Form

    // Api Link of Open Weather Map
    const weatherAPI = `https://api.openweathermap.org/data/2.5/weather?&q=${city}&units=${unit}&appid=a57bf2481c7e61724f796fb8678816f1&icon=04d`
    
    https.get(weatherAPI , response => {

        response.on('data', d => {
            
            const jasonData = JSON.parse(d); // To convert the weather data to JSON Format
            const temp = jasonData.main.temp; // To get the temperature

            res.send(`<h1>The weather in ${city} is ${temp} degree </h1>`)
        })
    })
})




app.listen(port)