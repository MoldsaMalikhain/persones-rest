import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PersonModule } from './person/person.module';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm/dist/typeorm.module';
import { RoleModule } from './role/role.module';
import config from '../sqlconf';

@Module({
  imports: [
    TypeOrmModule.forRoot(config),
    PersonModule,
    AuthModule,
    RoleModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
