/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import LoginPersonesDto from 'src/dto/login-persone.dto';
import { PersonesService } from '../persones.service';

@Injectable()
export class AuthService {

    constructor(
        private readonly personeService: PersonesService,
        private readonly jwt: JwtService
    ) { }

    async validateUser(loginDto: LoginPersonesDto) {
        const persone = await this.personeService.findOne(loginDto);
        if (persone && persone.password === loginDto.password) {
            const { password, ...result } = persone;
            return result
        }
        return null;
    }

    async login(persone: any) {
        const payload = { password: persone.password, sub: persone.id };
        return {
            token: this.jwt.sign(payload)
        }
    }

}
