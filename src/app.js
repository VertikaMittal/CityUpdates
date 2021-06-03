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
var cityName=null;
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
app.post("/",(req,res)=>{
  cityName=req.body.city;
  res.redirect("/get_temp");
})
// app.get("/get_temp", (req, res) => {


//   async function axiosTest() {
//     ab = await axios.get(
//       "http://api.openweathermap.org/data/2.5/weather?appid=cc6ce66bf521f3f06410403123840307"
//     ,{ params: { q: cityName} });
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
//         currenttemp: data.data.main.temp,
//         mintemp:data.data.main.temp_min,
//         maxtemp:data.data.main.temp_max,
//       });  
//   })
//   // .catch(err => console.log(err))
// });

app.get("/get_temp", (req, res) => {


  async function axiosTest() {
    ab = await axios.get(
      "https://api.weatherbit.io/v2.0/current?city=Meerut&key=83ffd4ff1807490e8dde456a3a909283");
    return ab;

  }
  axiosTest()
  .then(data => {
    res.render("temp", {
        location: cityName,
        day: dayNames[cday.getDay()],
        month: monthNames[cday.getMonth()],
        date: cday.getDate(),
        time: strTime,
        currenttemp: data.data.temp,
        mintemp:20,
        maxtemp:30,
      });  
  })
  .catch(err => console.log(err))
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
