const http = require("http");
const express = require("express");
const morgan = require("morgan");
const { Server } = require("socket.io");
const bodyParser = require('body-parser');

import { Client } from "./client";
import { UserMessage } from "../req";

console.log("START");

const app = express();
app.use(morgan("combined"));
app.use(bodyParser.json());

const server = http.Server(app);

const serverAccessToken: string = "8888";
const Clients: Set<Client> = new Set<Client>();

const io = new Server(server);

io.on("connection", async (socket) => {
  console.log('New connection - ' + socket.id);
  
  Clients.add(new Client(socket, serverAccessToken));
});

app.post("/send", async ( req, res )=>{
  console.log("---- message ----");
  console.log(req.body);

  const msg: UserMessage = req.body;
  
  Clients.forEach(( client: Client ) => {
    client.checkReq(msg);
  });
  //console.log(req);
  res.send(true);
});

server.listen(3047, () => {
  console.log(`Server started on port ${server.address().port}`);
});

console.log("END");