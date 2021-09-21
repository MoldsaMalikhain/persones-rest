/* eslint-disable prettier/prettier */
import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import CreateNotesDto from '../dto/create/create-notes.dto';
import { NotesService } from './notes.service';

@Controller('notes')
export class NotesController {

    constructor(private readonly notesServise: NotesService) { }

    @Post()
    create(@Body() notesDto: CreateNotesDto) {
        return this.notesServise.create(notesDto);
    }

    @Get()
    getAll() {
        return this.notesServise.getAll()
    }

    @Get(':id')
    getById(@Param('id') _id: number) {
        return this.notesServise.getById(_id);
    }


}
