import { ArgumentsHost, Catch, ExceptionFilter, NotFoundException, Redirect, Response, UnauthorizedException } from "@nestjs/common";

@Catch(UnauthorizedException)
export class UnauthorizedExceptionFilter implements ExceptionFilter {
    catch(exception: UnauthorizedException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const request = ctx.getRequest();
        const status = exception.getStatus();

        response.redirect('/login');
    }
}
