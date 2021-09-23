import { Controller, Get, Post, UseGuards, Request } from '@nestjs/common';
// import { AuthGuard } from '@nestjs/passport';
import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';
import { JwtAuthGuard } from './auth/guard/jwt-guard';
import { JwtAdminAuthGuard } from './auth/guard/jwt.admin-guard';
import { LocalAuthGuard } from './auth/guard/local-guard';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly authServise: AuthService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req) {
    return this.authServise.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    console.log(req.person);
    console.log(req.person.admin);
    return req.person;
  }
  @UseGuards(JwtAdminAuthGuard)
  @Get('admin')
  getAdmin(@Request() req) {
    console.log(req.person);
    console.log(req.person.admin);
    return req.person;
  }
}
