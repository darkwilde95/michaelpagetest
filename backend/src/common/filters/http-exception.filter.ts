import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const exceptionResponse: any =
      exception instanceof HttpException ? exception.getResponse() : null;

    let normalizedErrors: Array<{ field: string; message: string }> = [];

    if (
      status === HttpStatus.BAD_REQUEST &&
      exceptionResponse?.message &&
      Array.isArray(exceptionResponse.message)
    ) {
      normalizedErrors = exceptionResponse.message.map((msg: string) => {
        // Intentamos extraer la primera palabra que suele ser el nombre del campo en inglés o la propiedad
        const firstWord = msg.split(' ')[0];
        return {
          field: firstWord || 'general',
          message: msg,
        };
      });
    } else {
      // 2. Si es un error de negocio (string único), lo asignamos a un campo "global" o "business"
      const rawMessage =
        exceptionResponse?.message ||
        'Ocurrió un error inesperado en el servidor.';
      normalizedErrors = [
        {
          field: 'global',
          message:
            typeof rawMessage === 'string'
              ? rawMessage
              : JSON.stringify(rawMessage),
        },
      ];
    }

    response.status(status).json({
      statusCode: status,
      error:
        exceptionResponse?.error ||
        (status === 500 ? 'Internal Server Error' : 'Bad Request'),
      code:
        exceptionResponse?.code ||
        (status === 400 ? 'VALIDATION_ERROR' : 'SYSTEM_ERROR'),
      errors: normalizedErrors,
      technicalDetails: exceptionResponse?.technicalDetails || null,
      correlationId: request.headers['x-correlation-id'] as string,
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}
