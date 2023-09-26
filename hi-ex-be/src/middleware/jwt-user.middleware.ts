import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request } from 'express'; // Updated import
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtUserMiddleware implements NestMiddleware {
  constructor(private readonly jwtService: JwtService) {}

  async use(req: Request, res, next?: () => void) {
    const expressReq = req as any;
    const token = expressReq.headers.authorization?.split(' ')[1];

    if (token) {
      try {
        const decoded = await this.jwtService.verify(token);
        req.user = decoded;
      } catch (err) {
        console.log(err);
      }
    }

    next();
  }
}
