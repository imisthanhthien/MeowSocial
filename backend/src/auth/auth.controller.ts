// src/auth/auth.controller.ts
import { Body, Controller, Post, HttpCode } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

@Post('register')
register(@Body() body: RegisterDto) {
  return this.authService.register(body.name, body.email, body.password);
}

@Post('login')
@HttpCode(200)
login(@Body() body: LoginDto) {
  return this.authService.login(body.email, body.password);
}
}
