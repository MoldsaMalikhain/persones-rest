/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm/dist/typeorm.module';
import { Persones } from 'src/entity/persones.entity';
import { Roles } from 'src/entity/roles.entity';
import { RolesController } from './roles.controller';
import { RolesService } from './roles.service';

@Module({
  imports: [TypeOrmModule.forFeature([Roles, Persones])],
  controllers: [RolesController],
  providers: [RolesService],
})
export class RolesModule { }
