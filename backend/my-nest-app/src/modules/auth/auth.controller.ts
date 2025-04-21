import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post, Put, Query } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/auth.dto';
import { MailResetPasswordDto, VerifyTokenDto } from './dto/send-email.dto';
import { RegisterDto } from './dto/register.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {

  }

  @Post('/login')
  @HttpCode(HttpStatus.OK)
  async login(
    @Body() inforUser: LoginDto,
  ) {
    return this.authService.login(inforUser);
  }

  @Post('/register')
  @HttpCode(HttpStatus.OK)
  async register(
    @Body() body: RegisterDto,
  ) {
    return this.authService.register(body);
  }

  @Post('/login-web')
  @HttpCode(HttpStatus.OK)
  async loginWeb(
    @Body() inforUser: LoginDto,
  ) {
    return this.authService.loginWeb(inforUser);
  }

  @Get('/verify-token/:token')
  @HttpCode(HttpStatus.OK)
  async verifyToken(
    @Param() token: VerifyTokenDto,
  ) {
    return this.authService.verifyToken(token);
  }

  @Post('/send-email-reset-password')
  @HttpCode(HttpStatus.OK)
  async sendMail(
    @Body() email: MailResetPasswordDto,
  ) {
    return this.authService.sendEmailResetPassword(email);
  }
}
