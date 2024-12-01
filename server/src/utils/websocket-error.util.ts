import { Logger } from '@nestjs/common';

export class WebSocketErrorUtil {
  private static logger = new Logger('WebSocketErrorUtil');

  static handleError(client: any, error?: any, customMessage?: string) {
    if (error) {
      this.logger.error(error);
    }

    client.emit('error', {
      message: customMessage || 'An error occurred',
    });
  }
}
