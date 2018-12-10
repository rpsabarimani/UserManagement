var express = require("express"),
  app = express(),
  bodyParser = require("body-parser"),
  http = require("http");
var cors = require("cors");
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//The dist folder has our static resources (index.html, css, images)
app.use(express.static(__dirname + "/dist"));

app.get("/users", function(req, res) {
  var results = [
    {
      results: [
        {
          firstName: "Sabarimani",
          lastName: "Radhakrishnan",
          email: "rpsabarimani@gmail.com"
        },
        {
          firstName: "Pathma",
          lastName: "Radhakrishnan",
          email: "rpathma.r@gmail.com"
        }
      ],
      error: [{ errCode: 0, errMsg: "Data fecthed Successfully" }]
    }
  ];
  res.json(results);
});

// redirect all others to the index (HTML5 history)
app.all("/*", function(req, res) {
  res.sendFile(__dirname + "/dist/index.html");
});
app.listen(3000);
