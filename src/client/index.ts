const { io, Socket } = require("socket.io-client");
const http = require("http");
import { req } from "../req";

const clientPassword = "12345";

console.log("START");

const socket = io("http://localhost:3047");

socket.on("connect", () => {
  console.log("connect");

  socket.emit("reg", "7878", "8888");
});

socket.on("message", ( msgName: string, password: string, msg: string, args: any ) => {
  console.log("New message");
  console.log(msgName);
  console.log(password);
  console.log(msg);
  console.log(args);

  if (password != clientPassword)
  {
    console.log("Invalid password '" + password + "'");
    return;
  }
  console.log("Name - " + msg);
  console.log("Args:");
  console.log(args);
});

console.log("END");
