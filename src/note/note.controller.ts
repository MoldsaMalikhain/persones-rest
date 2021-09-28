import { Controller, Delete, Get, Param } from '@nestjs/common';
import { NoteService } from './note.service';

@Controller('note')
export class NoteController {
  constructor(private readonly noteServise: NoteService) {}

  @Get()
  async getAll() {
    return this.noteServise.getAll();
  }

  @Delete(':id')
  async delete(@Param('id') _id: number) {
    return this.noteServise.delete(_id);
  }
}
