import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as cookie from 'cookie'; // Import the cookie parser

@Injectable()
export class WsGatewayGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean {
    try {
      const client = context.switchToWs().getClient();
      const headers = client.handshake.headers;
      const cookies = headers?.cookie;

      if (!cookies) {
        return false;
      }

      const parsedCookies = cookie.parse(cookies);
      const jwt = parsedCookies['Authorization'];

      if (!jwt) {
        return false;
      }

      const decoded = this.jwtService.verify(jwt);

      client.user = decoded;
    } catch (error) {
      console.error('Guard Error:', error.message);
      return false;
    }

    return true;
  }
}
