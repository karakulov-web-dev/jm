var express = require("express");
var app = express();
var expressWs = require("express-ws")(app);

app.get("/", function(req, res, next) {
  console.log("get route", req.testing);
  res.end();
});

let client;

app.ws("/", function(ws, req) {
  client = ws;
  console.log(ws);
  console.log(req);
});

setInterval(() => {
  if (client) {
    client.send("123");
  }
}, 5000);

app.listen(3000);
