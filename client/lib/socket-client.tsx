import { io, Socket } from "socket.io-client";

export class SocketClient {
  private static instance: SocketClient;
  private socket: Socket;

  private constructor() {
    this.socket = io(process.env.NEXT_PUBLIC_SOCKET_URL, {
      withCredentials: true,
    }); // Replace with your server URL
  }

  public static getInstance() {
    if (!SocketClient.instance) {
      SocketClient.instance = new SocketClient();
    }
    return SocketClient.instance.getSocket();
  }

  public getSocket(): Socket {
    return this.socket;
  }
}
