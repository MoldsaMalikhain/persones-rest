import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm/dist/typeorm.module';
import { Person } from 'src/entity/person.entity';
import { Role } from 'src/entity/role.entity';
import { RoleModule } from 'src/role/role.module';
import { PersonController } from './person.controller';
import { PersonService } from './person.service';

@Module({
  imports: [
    forwardRef(() => RoleModule),
    TypeOrmModule.forFeature([Role, Person]),
  ],
  controllers: [PersonController],
  providers: [PersonService],
  exports: [PersonService],
})
export class PersonModule {}
