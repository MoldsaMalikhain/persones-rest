import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Skills } from 'src/entity/skills.entity';
import { SkillService } from './skill.service';

@Module({
  imports: [TypeOrmModule.forFeature([Skills])],
  providers: [SkillService],
  exports: [SkillService],
})
export class SkillModule {}
