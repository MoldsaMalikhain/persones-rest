/* eslint-disable prettier/prettier */
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { Strategy } from "passport-jwt";
import { PassportStrategy } from '@nestjs/passport';
import { AuthService } from "../auth.service";
import LoginPersonesDto from "src/dto/login-persone.dto";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {

    constructor(private readonly authServise: AuthService) {
        super()
    }

    async validate(loginDto: LoginPersonesDto): Promise<any> {
        const persone = await this.authServise.validateUser(loginDto);
        if (!persone) throw new UnauthorizedException()

        return persone
    }


}