import { Controller, Delete, Get, Param } from '@nestjs/common';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Notes } from 'src/entity/notes.entity';
import { NoteService } from './note.service';

@ApiTags('Note')
@Controller('note')
export class NoteController {
  constructor(private readonly noteServise: NoteService) {}

  @Get()
  @ApiOperation({ summary: 'Get all Notes in system' })
  @ApiCreatedResponse({
    description: 'Here is Notes which you want to find',
    type: Notes,
  })
  async getAll(): Promise<Notes[]> {
    return this.noteServise.getAll();
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete Note form system' })
  @ApiCreatedResponse({
    description: 'Notes record has been successfully deleted',
    type: Notes,
  })
  async delete(@Param('id') _id: number): Promise<Notes> {
    return this.noteServise.delete(_id);
  }
}
