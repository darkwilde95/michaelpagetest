import { Injectable, NestMiddleware, Logger } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class RequestResponseLogger implements NestMiddleware {
  private logger = new Logger('HTTP');

  use(req: Request, res: Response, next: NextFunction) {
    const { method, originalUrl, body } = req;

    // 1. Log de la petición entrante
    this.logger.log(
      `--> INCOMING: ${method} ${originalUrl} | Body: ${JSON.stringify(body)}`,
    );

    const originalSend = res.send;
    res.send = function (responseBody) {
      const logger = new Logger('HTTP');
      logger.log(
        `<-- OUTGOING: ${method} ${originalUrl} [Status: ${res.statusCode}] | Response: ${responseBody}`,
      );

      return originalSend.apply(this, arguments);
    };

    next();
  }
}
