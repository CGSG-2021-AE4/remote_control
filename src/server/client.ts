import { UserMessage, req } from "../req";

export class Client {
  socket;
  login: string;
  serverAccessToken: string;

  /* Setup client requests */
  setupClientRequests() {
    console.log("Setup client");
    this.socket.on("reg", ( login: string, token: string, res ) => {
      if (token != this.serverAccessToken) // Check for access
      {
        console.log("Socket '" + login + "' - invalid access tocket.");
        return;
      }
      console.log("Reg socket '" + login + "'");
      this.login = login;
      console.log(res);
    });
  } /* End of 'setupClientRequests' function */

  /* Check request function */
  checkReq( msg: UserMessage ): boolean {
    if (msg.login != this.login)
      return false;

    console.log("Send message '" + msg.message + "' to '" + this.login + "'");
    this.socket.send("message", msg.password, msg.message, msg.args);
    return true;
  } /* End of 'checkReq' function */

  constructor( socket, token: string ) {
    this.socket = socket;
    this.serverAccessToken = token;
    this.setupClientRequests();
  } /* Ebd of 'contructor' function */
} /* End of 'Client' class */