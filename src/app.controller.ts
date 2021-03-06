import { Controller } from '@nestjs/common';
// import { AuthGuard } from '@nestjs/passport';
import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';
// import LoginDto from './dto/login.dto';

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

  // @Roles(ROLES.USER)
  // @UseGuards(JwtAuthGuard)
  // @Get('profile')
  // getProfile(@Request() req) {
  //   console.log(req.person);
  //   console.log(req.person.role);
  //   return req.person;
  // }

  // // @Roles('admin')
  // @UseGuards(JwtAuthGuard)
  // @Get(ROLES.ADMIN)
  // getAdmin(@Request() req) {
  //   console.log(req.person);
  //   console.log(req.person.role);
  //   return req.person;
  // }
}
