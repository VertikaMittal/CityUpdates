const requests = require("requests");
const express = require("express");
const axios = require("axios");
const app = express();
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

//for news page
// var newsposts = [];

app.get("/", (req, res) => {
  res.render("index");
});
app.post("/", (req, res) => {
  cityName = req.body.city;
  stateName=req.body.state;
  // res.redirect("/get_temp");
});
app.get("/get_temp", (req, res) => {
  async function axiosTest() {
    ab = await axios.get(
      "http://api.openweathermap.org/data/2.5/weather?appid=cc6ce66bf521f3f06410403123840307&units=metric",
      { params: { q: cityName } }
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

// app.get("/get_temp", (req, res) => {

//   async function axiosTest() {
//     ab = await axios.get("https://api.weatherbit.io/v2.0/current?city=Meerut&key=83ffd4ff1807490e8dde456a3a909283");
//     console.log(ab);
//     return ab;

//   }
//   axiosTest()
//   .then(data => {
//     res.render("temp", {
//         location: cityName,
//         day: dayNames[cday.getDay()],
//         month: monthNames[cday.getMonth()],
//         date: cday.getDate(),
//         time: strTime,
//         currenttemp: ab.data.data[0].temp,
//         mintemp:20,
//         maxtemp:30,
//       });
//   })
//   .catch(err => console.log(err))
// });

// app.get("/get_news", (req, res) => {


//   async function axiosTest() {
//     ab = await axios.get(
//       "https://newsapi.org/v2/everything?language=en&sortBy=popularity&apiKey=8576618518634db4bd1044cd43dc64ba",
//       { params: { q:cityName,qInTitle:" ",sources:"bbc-news",domains:"bbc.co.uk" } }
//     );
//     return ab;
//   }
//   axiosTest()
//     .then((data) => {
//       // console.log();
     
//       // console.log(newsposts);
//       res.render("news", {
//         newsposts:ab.data.articles
//           });
//     })
//     .catch((err) => console.log(err));
// });


app.get("/get_news", (req, res) => {


  async function axiosTest() {
    ab = await axios.get(
      "https://newsdata.io/api/1/news?apikey=pub_352347236fbf4718cdac2d008f2a2ada97d&country=in&language=en",
      { params: { q:stateName} }
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
  
  res.render("map");
});
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
