import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const requestMethod = req.method;
    const requestUrl = req.originalUrl;
    const requestTime = new Date().toLocaleString();
    console.log(`${requestMethod} ${requestUrl} - ${requestTime}`);
    next();
  }
}
