/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm/dist/typeorm.module';
import { Notes } from 'src/entity/notes.entity';
import { Persones } from 'src/entity/persones.entity';
import { NotesController } from './notes.controller';
import { NotesService } from './notes.service';


@Module({
    imports: [TypeOrmModule.forFeature([Notes, Persones])],
    controllers: [NotesController],
    providers: [NotesService],
})
export class NotesModule { }
