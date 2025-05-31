import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'Internal server error';
    let error: string | null = null;
    let code = -1;

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const res = exception.getResponse();
      if (typeof res === 'string') {
        message = res;
      } else if (typeof res === 'object' && res !== null) {
        const responseObj = res as Record<string, unknown>;
        const msgValue = responseObj.message || responseObj.error || message;
        message =
          typeof msgValue === 'string' ? msgValue : JSON.stringify(msgValue);
        const errorValue = responseObj.error;
        error =
          errorValue && typeof errorValue === 'string'
            ? errorValue
            : errorValue
              ? JSON.stringify(errorValue)
              : null;
      }
      code = -status;
    } else if (exception instanceof Error) {
      message = exception.message;
      error = exception.stack || null;
    }

    response.status(status).json({
      code,
      message,
      error,
    });
  }
}
