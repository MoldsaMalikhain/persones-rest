import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import CreatePersonesDto from 'src/dto/create/person-create.dto';
import LoginDto from 'src/dto/login.dto';
// import LoginDto from 'src/dto/login.dto';
// import RegisterDto from 'src/dto/registration.dto';
import { PersonService } from 'src/person/person.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly personService: PersonService,
    private readonly jwtService: JwtService,
  ) {}

  async validate(username: string, password: string): Promise<any> {
    // const user = await this.personService.findOne(username);
    console.log(username, password);
    const user = await this.personService.findByName(username);
    // console.log(user);
    if (user && user.password === password) {
      console.log('AuthCheck');
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async register(registerDto: CreatePersonesDto) {
    const toRegister = this.personService.findForRegister(registerDto);
    if (toRegister) return null;

    const person = await this.personService.create(registerDto);

    return person;
  }

  async login(user: any): Promise<{ access_token: string }> {
    const payload = {
      username: user.username,
      sub: user.userId,
      role: user.role.name,
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
