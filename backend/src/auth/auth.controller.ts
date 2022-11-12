import { Body, Controller, HttpCode, HttpStatus, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Login, SignUp } from './dto';
import { LocalAuthGuard } from './guard';

@Controller('auth')
export class AuthController {
    constructor(private authService : AuthService){}

    @Post('signup')
    signup(@Body() dto : SignUp) {
        return this.authService.signup(dto);
    }

    @UseGuards(LocalAuthGuard)
    @Post('login')
    @HttpCode(HttpStatus.OK)
    login(@Body() dto : Login) {
        return this.authService.login(dto);
    }

}
