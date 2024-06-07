import { ErrorMessageCode } from '@/constants/error-message-code';
import { ErrorCode } from '@/constants/error-code';

export class BaseExceptionDto<T = any> {
  statusCode: number;
  message: string;
  errors: T[];
  errorCode: number;

  constructor(
    statusCode = 400,
    message = ErrorMessageCode.UNKNOWN,
    errors: T[] = [],
    errorCode: number = ErrorCode.UNKNOWN,
  ) {
    this.message = message;
    this.errors = errors;
    this.statusCode = statusCode;
    this.errorCode = errorCode;
  }
}
