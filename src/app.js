const requests = require("requests");
const express = require("express");
const axios = require("axios");
const app = express();
require('dotenv').config();
// console.log(process.env.map_key);
const bodyParser = require("body-parser");
const port = process.env.PORT || 3000;
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
var cday = new Date();
var ab = null;
var cityName = null;
var stateName = null;
const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
var hours = cday.getHours();
var minutes = cday.getMinutes();
var ampm = hours >= 12 ? "pm" : "am";
hours = hours % 12;
hours = hours ? hours : 12; // the hour '0' should be '12'
var strTime = hours + ":" + minutes + " " + ampm;


app.get("/", (req, res) => {
  res.render("index");
});
app.post("/", (req, res) => {
  cityName = req.body.city;
  stateName=req.body.state;
  // res.redirect("/get_temp");
});
app.get("/get_temp", (req, res) => {
  const temp_api_key=process.env.temp_key
  async function axiosTest() {
    ab = await axios.get(
      "http://api.openweathermap.org/data/2.5/weather?units=metric",
      { params: { appid:temp_api_key,q: cityName } }
    );
    return ab;
  }
  axiosTest()
    .then((data) => {
      res.render("temp", {
        location: cityName,
        day: dayNames[cday.getDay()],
        month: monthNames[cday.getMonth()],
        date: cday.getDate(),
        time: strTime,
        currenttemp: data.data.main.temp,
        mintemp: data.data.main.temp_min,
        maxtemp: data.data.main.temp_max,
      });
    })
    .catch((err) => console.log(err));
});



app.get("/get_news", (req, res) => {

const news_api_key=process.env.news_key
  async function axiosTest() {
    ab = await axios.get(
      "https://newsdata.io/api/1/news?country=in&language=en",
      { params: {apikey:news_api_key, q:stateName} }
    );
    return ab;
  }
  axiosTest()
    .then((data) => {
      // console.log();
     
      // console.log(newsposts);
      res.render("news", {
        newsposts:ab.data.results
          });
    })
    .catch((err) => console.log(err));
});

app.get("/get_maps",(req,res)=>{
  
  res.render("map",{
    map_page_key:process.env.map_key
  });
});
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
