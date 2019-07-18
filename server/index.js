const express = require("express");
var app = express();
require("express-ws")(app);
const Clients = require("./Clients");

const clients = new Clients();

global["clients"] = clients;

app.ws("/", (ws, req) => {
  console.log(ws);
  console.log(req);
  clients.newClient(ws);
});

setInterval(() => {}, 5000);

app.listen(3000);
