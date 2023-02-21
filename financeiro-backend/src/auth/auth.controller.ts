import { Controller, Get, HttpCode, HttpException, HttpStatus, Post, Redirect, Request, UseGuards } from '@nestjs/common';
import { User } from 'src/user/entities/user.entity';
import { AuthService } from './auth.service';
import { IsPublic } from './decorators/is-public.decorator';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { AuthRequest } from './models/AuthRequest';

@Controller()
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @IsPublic( )
    @Post('login')
    @HttpCode(HttpStatus.OK)
    @UseGuards(LocalAuthGuard)
    async login(@Request() req: AuthRequest) {
        return this.authService.login(req.user).catch(error => {
            return error;
        })
    }

    @IsPublic()
    @Get('tologin')
    toLogin() {
        throw new HttpException('usuário não autorizado', HttpStatus.UNAUTHORIZED);
    }
}
