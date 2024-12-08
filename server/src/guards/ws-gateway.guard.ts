import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class WsGatewayGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  canActivate(context: ExecutionContext) {
    try {
      const client = context.switchToWs().getClient();
      const headers = client.handshake.headers;
      const cookies = headers?.cookie;

      if (!cookies) {
        return false;
      }

      const token = cookies
        .split(';')
        .find((cookie) => cookie.includes('Authorization'));

      if (!token) {
        return false;
      }

      const [_, jwt] = token.split('=');
      this.jwtService.verify(jwt);
    } catch (error) {
      return false;
    }

    return true;
  }
}
