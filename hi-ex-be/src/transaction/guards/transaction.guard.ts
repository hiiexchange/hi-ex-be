import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

@Injectable()
export class TransactionGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const user = request.user; // This should be set by the authentication middleware
    const transactionUserId = request.params.userId; // Assuming you pass the user ID in the route

    return user.id === transactionUserId; // Only allow access if the user ID matches the transaction owner's ID
  }
}
