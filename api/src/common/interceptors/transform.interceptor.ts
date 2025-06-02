import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class TransformInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data) => ({
        code: 200,
        message: 'success',
        data: this.transformBigIntToString(data) as Record<string, unknown>,
      })),
    );
  }

  /**
   * 递归转换对象中的BigInt字段为字符串
   * 解决JSON序列化BigInt时的错误
   */
  private transformBigIntToString(obj: unknown): unknown {
    if (obj === null || obj === undefined) {
      return obj;
    }

    if (typeof obj === 'bigint') {
      return obj.toString();
    }

    if (Array.isArray(obj)) {
      return obj.map((item) => this.transformBigIntToString(item));
    }

    if (typeof obj === 'object') {
      const transformed: Record<string, unknown> = {};
      for (const [key, value] of Object.entries(obj)) {
        transformed[key] = this.transformBigIntToString(value);
      }
      return transformed;
    }

    return obj;
  }
}
