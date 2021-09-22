/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { PersonesModule } from '../persones.module';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategies/jwt.strategy';
import { jwtContent } from './jwtContent';
import { LocalStrategy } from './strategies/local-strategy';
import { PersonesService } from '../persones.service';

@Module({
    imports: [
        PassportModule,
        JwtModule.register({
            secret: jwtContent.secret,
            signOptions: { expiresIn: '120s' }
        }),
        PersonesModule,
    ],
    providers: [AuthService, LocalStrategy, JwtStrategy, PersonesService],
})
export class AuthModule { }
