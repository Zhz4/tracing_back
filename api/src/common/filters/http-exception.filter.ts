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
    let message = '网络异常';
    let error: string | null = null;
    let code = 500;

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
      console.error(exception.message);
      console.error(exception.stack);
      message = '服务器异常';
      error = exception.message;
    }

    response.status(status).json({
      code,
      message,
      error,
    });
  }
}
