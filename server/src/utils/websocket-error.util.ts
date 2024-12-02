import { Logger } from '@nestjs/common';
import { Socket } from 'socket.io';

export class WebSocketErrorUtil {
  private static logger = new Logger('WebSocketErrorUtil');

  static handleError(
    client: Socket,
    userId: string,
    error?: any,
    customMessage?: string,
  ) {
    if (error) {
      this.logger.error(error);
    }

    client.emit('error', {
      message: error?.message || customMessage || 'An error occurred',
      userId,
    });
  }
}
