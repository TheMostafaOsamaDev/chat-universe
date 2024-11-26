import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class WsGatewayGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean /* : boolean | Promise<boolean> | Observable<boolean>  */ {
    const client = context.switchToWs().getClient();

    // console.log('=====================================');
    // console.log(client);

    return true;
  }
}
