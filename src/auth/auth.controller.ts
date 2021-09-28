import { Controller, Post, UseGuards, Request, Get } from '@nestjs/common';
import { ROLES } from 'magic.const';
import { Roles } from 'src/roles.decorator';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guard/jwt-guard';
import { LocalAuthGuard } from './guard/local-guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    // console.log(req.user);
    return this.authService.login(req.user);
  }

  @Roles(ROLES.ALL)
  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async profile(@Request() req) {
    return req.person;
  }
}
