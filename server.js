var express = require("express"),
  app = express(),
  bodyParser = require("body-parser");
var cors = require("cors");

var usersController = require("./apis/users");

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//The dist folder has our static resources (index.html, css, images)
app.use(express.static(__dirname + "/dist"));

app.use("/apis/*", function timeLog(req, res, next) {
  var authentication = req.headers.authorization;
  if (authentication) {
    authentication = authentication.replace(/^Basic/, "");
    authentication = new Buffer(authentication, "base64").toString("utf8");
    var logInfo = authentication.split(":");

    console.log(logInfo);
    if (logInfo[0] == "Sabari" && logInfo[1] == "Sabari@123") {
      next();
    } else {
      // res.writeHead(401);
      res.status(401).send("Invalid Authentication");
    }
  }
  next();
});

app.use("/apis/users", usersController);

// redirect all others to the index (HTML5 history)
app.all("/*", function(req, res) {
  res.sendFile(__dirname + "/dist/index.html");
});
app.listen(3000);
