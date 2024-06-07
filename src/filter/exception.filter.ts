import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { HttpArgumentsHost } from '@nestjs/common/interfaces/features/arguments-host.interface';
import { FastifyReply, FastifyRequest } from 'fastify';

import { BaseExceptionDto } from '@/base/base.exception';
import { I18nService } from '@/components/i18n.service';
import { DEFAULT_LOCALE } from '@/configs/config';
import { ErrorCode } from '@/constants/error-code';
import { ErrorMessageCode } from '@/constants/error-message-code';
import { BaseError, DatabaseError } from '@/exceptions/errors';
import { LoggerService } from '@/logger/custom.logger';
import { isProd } from '@/utils/util';

@Catch()
export class AllExceptionFilter implements ExceptionFilter {
  constructor(
    private logger: LoggerService,
    private readonly i18nService: I18nService,
  ) {}

  private handleResponse(
    request: FastifyRequest,
    response: FastifyReply,
    exception: HttpException | Error,
  ): void {
    let statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
    let errorCode = ErrorCode.UNKNOWN;
    let message = 'Internal server error';
    const lang =
      request?.headers['accept-language']?.split(';')[0]?.split(',')[0] ||
      DEFAULT_LOCALE;
    let responseBody: BaseExceptionDto = {
      statusCode: statusCode,
      errorCode: errorCode,
      message: message,
      errors: [],
    };
    if (exception instanceof DatabaseError) {
      statusCode = exception.getStatus();
      errorCode = exception.getErrorCode();
      message = ErrorMessageCode.DATABASE_ERROR;
      responseBody = {
        statusCode: statusCode,
        errorCode: errorCode,
        message: message,
        errors: [message],
      };
      if (!isProd()) {
        const errMsg = this.getResponseMessage(exception);
        responseBody.errors.push(errMsg);
      }
    } else if (exception instanceof BaseError) {
      statusCode = exception.getStatus();
      errorCode = exception.getErrorCode();
      message = this.getResponseMessage(exception);
      responseBody = {
        statusCode: statusCode,
        errorCode: errorCode,
        message: message,
        errors: [message],
      };
    } else if (exception instanceof HttpException) {
      const responseException = exception.getResponse();
      statusCode = exception.getStatus();
      errorCode =
        ((responseException as Record<string, unknown>)?.errorCode as number) ||
        ErrorCode.UNKNOWN;
      message = this.getResponseMessage(responseException);
      responseBody = {
        statusCode: statusCode,
        errorCode: errorCode,
        message: message,
        errors: [message],
      };
    } else if (exception instanceof Error) {
      statusCode = HttpStatus.BAD_REQUEST;
      errorCode = ErrorCode.UNKNOWN;
      message = exception.message;
      responseBody = {
        statusCode: statusCode,
        errorCode: errorCode,
        message: message,
        errors: [message],
      };
    }

    if (Array.isArray(responseBody.message)) {
      responseBody.errors.push(...responseBody.message);
      responseBody.message = responseBody.message[0];
    }
    if (responseBody.message) {
      responseBody.message = this.i18nService.lang(
        responseBody.message as string,
        lang,
      );
    }
    response.status(statusCode).send(responseBody);
  }

  catch(
    exception: HttpException | Error | BaseError,
    host: ArgumentsHost,
  ): void {
    const ctx: HttpArgumentsHost = host.switchToHttp();
    const request = ctx.getRequest<FastifyRequest>();
    const response = ctx.getResponse<FastifyReply>();
    // Handling error message and logging
    this.handleMessage(request, exception);
    // Response to client
    this.handleResponse(request, response, exception);
  }

  private handleMessage(
    request: FastifyRequest,
    exception: HttpException | Error,
  ): void {
    let message = 'Internal Server Error';

    if (exception instanceof HttpException || exception instanceof BaseError) {
      message = JSON.stringify(exception.getResponse());
    } else if (exception instanceof Error) {
      message = exception.stack.toString();
      if (message.includes('no such file or directory')) {
        message = 'Not Found';
      }
    }
    this.logger.error(message, exception.stack, exception.name);
    this.logger.error('######### Error Info #############');
    this.logger.error({
      ip: request.ip,
      url: request.originalUrl,
      method: request.method,
      headers: request.headers,
    });
    this.logger.error({
      query: request.query,
      body: request.body,
    });
    this.logger.error('######### Error Info #############');
  }

  getResponseMessage(response: string | object) {
    if (typeof response === 'string') {
      return response;
    } else if (typeof response === 'object' && 'message' in response) {
      if (Array.isArray(response.message)) {
        return response.message[0];
      } else {
        return response.message;
      }
    }
  }
}
