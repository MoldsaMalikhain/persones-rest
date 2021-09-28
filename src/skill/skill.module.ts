import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Skills } from 'src/entity/skills.entity';
import { SkillService } from './skill.service';
import { SkillController } from './skill.controller';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([Skills]), AuthModule],
  providers: [SkillService],
  exports: [SkillService],
  controllers: [SkillController],
})
export class SkillModule {}
