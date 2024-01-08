const { io, Socket } = require("socket.io-client");
const { exec } = require('child_process');
const http = require("http");
import { req } from "../req";

const serverHost = 
//"http://localhost";
//"192.168.0.125";
"https://ae4-remote.onrender.com";
const clientPassword = "12345";

function system( command: string ) {
  exec(command, (error, stdout, stderr) => {
    console.log("$>" + command);
    if (error) {
      console.log(`ERROR: ${error.message}`);
      return;
    }
    if (stderr) {
      console.log(`STDERROR: ${stderr}`);
      return;
    }
    console.log(stdout);
  });
}

const messagesCallBacks: { [name: string]: any } = {
  StartAnyDesk: ()=>{
    console.log("STAAAARting anydesk");
    system("start C:/Users/Andr/Downloads/AnyDesk.exe");
  },
  TimeToSleep: ()=>{
    console.log("We are going sleep");
    system("start C:/remote_scripts/test.bat");
  }
};

console.log("START");
console.log("Server host: " + serverHost);

/** /
const socket = io("http://localhost:3047");
/**/
const socket = io(serverHost, {
  port: 3047,
  reconnect: true
});
/**/

socket.on("connect", () => {
  console.log("connect");

  socket.emit("reg", "7878", "12341234");
});

socket.on("message", ( msgName: string, password: string, msg: string, args: any ) => {
  console.log("-=-- New message --=-");
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
  if (messagesCallBacks[msg] == undefined)
    console.log("Invalid message name '" + msg + "'");
  else  
  {
    console.log("Start message callback");
    messagesCallBacks[msg](args);
  }
  console.log("-=-----------------=-");

});

console.log("END");
