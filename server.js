const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const request = require("request");
const apiKey = require("./keys/keys").apikey;

//use body-parser

app.use(bodyParser.urlencoded({ extended: true }));

//to use css
app.use(express.static("public"));

//setting ejs
app.set("view engine", "ejs");

//rendering home page

app.get("/", function(req, res) {
  res.render("index", { weather: null, error: null });
});

//submitting city name

app.post("/", function(req, res) {
  let city = req.body.city;
  let url = `http://api.openweathermap.org/data/2.5/forecast?q=${city},IN&appid=${apiKey}&cnt=56`;

  request(url, (err, response, body) => {
    if (err) {
      res.render("index", { weather: null, error: "Error,please try again" });
    } else {
      let weatherdays = {
        sunday: "",
        monday: "",
        tuesday: "",
        wednesday: "",
        thursday: "",
        friday: "",
        saturday: ""
      };
      let fetchapi = JSON.parse(body);
      let listofdetails = fetchapi.list;
      //console.log(listofdetails);

      listofdetails.map(list => {
        let datefetched = new Date(list.dt_txt);
        let exactdate = datefetched.getDay();
        if (exactdate == 0) {
          weatherdays.sunday = list.main.temp;
        }
        if (exactdate == 1) {
          weatherdays.monday = list.main.temp;
        }
        if (exactdate == 2) {
          weatherdays.tuesday = list.main.temp;
        }
        if (exactdate == 3) {
          weatherdays.wednesday = list.main.temp;
        }
        if (exactdate == 4) {
          weatherdays.thursday = list.main.temp;
        }
        if (exactdate == 5) {
          weatherdays.friday = list.main.temp;
        }
        if (exactdate == 6) {
          weatherdays.saturday = list.main.temp;
        }
      });

      res.render("index", { weather: weatherdays, error: null });
      console.log(weatherdays);

      /* let dateoffetch = new Date(fetchapi.list[0].dt_txt);
      console.log(dateoffetch.getDay());
      res.render("index", {
        weather: dateoffetch,
        error: null
      });*/
    }
  });

  //console.log(req.body);
  //res.render("index");
});

app.listen(3000, function() {
  console.log("Example app listening on port 3000!");
});
