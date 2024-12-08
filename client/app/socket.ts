"use client";

import { io, Socket } from "socket.io-client";

class SocketClient {
  private static instance: Socket;

  private constructor() {}

  public static getInstance(): Socket {
    if (!SocketClient.instance) {
      SocketClient.instance = io(process.env.NEXT_PUBLIC_SOCKET_URL, {
        withCredentials: true,
      });
    }

    return SocketClient.instance;
  }
}

export default SocketClient;
