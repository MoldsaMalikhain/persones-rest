import { Controller, Get, Post, UseGuards, Request } from '@nestjs/common';
// import { AuthGuard } from '@nestjs/passport';
import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';
import { JwtAuthGuard } from './auth/guard/jwt-guard';
import { LocalAuthGuard } from './auth/guard/local-guard';
// import LoginDto from './dto/login.dto';
import { Roles } from './roles.decorator';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly authServise: AuthService,
  ) {}

  // @UseGuards(LocalAuthGuard)
  // @Post('auth/login')
  // async login(@Request() req) {
  //   console.log(req.user);
  //   return this.authServise.login(req.user);
  // }

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req) {
    console.log(req.user);
    return this.authServise.login(req.user);
  }

  @Roles('all')
  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    console.log(req.person);
    console.log(req.person.role);
    return req.person;
  }

  @Roles('admin')
  @UseGuards(JwtAuthGuard)
  @Get('admin')
  getAdmin(@Request() req) {
    console.log(req.person);
    console.log(req.person.role);
    return req.person;
  }
}
