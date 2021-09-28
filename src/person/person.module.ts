import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm/dist/typeorm.module';
import { AuthModule } from 'src/auth/auth.module';
import { Absences } from 'src/entity/absences.entity';
import { Notes } from 'src/entity/notes.entity';
import { Person } from 'src/entity/person.entity';
import { Role } from 'src/entity/role.entity';
import { Salaries } from 'src/entity/salaries.entity';
import { Skills } from 'src/entity/skills.entity';
import { RoleModule } from 'src/role/role.module';
import { PersonController } from './person.controller';
import { PersonService } from './person.service';

@Module({
  imports: [
    forwardRef(() => RoleModule),
    TypeOrmModule.forFeature([Person, Skills, Absences, Notes, Salaries, Role]),
    AuthModule,
  ],
  controllers: [PersonController],
  providers: [PersonService],
  exports: [PersonService],
})
export class PersonModule {}
