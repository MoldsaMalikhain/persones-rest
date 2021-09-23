import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import LoginDto from 'src/dto/login.dto';
import { PersonService } from 'src/person/person.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly personService: PersonService,
    private readonly jwtService: JwtService,
  ) {}

  async validate(username: string, pass: string): Promise<any> {
    const user = await this.personService.findOne(username);
    console.log(user);
    if (user && user.password === pass) {
      console.log('AuthCheck');
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async register(registerDto: LoginDto) {
    return;
  }

  async login(user: any) {
    const payload = {
      username: user.username,
      sub: user.userId,
      admin: user.isAdmin,
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
