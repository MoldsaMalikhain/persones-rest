import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Notes } from 'src/entity/notes.entity';
import { Repository } from 'typeorm';

@Injectable()
export class NoteService {
  constructor(
    @InjectRepository(Notes) private noteRepository: Repository<Notes>,
  ) {}

  async getAll() {
    return this.noteRepository.find({ relations: ['user_m', 'person'] });
  }

  async delete(_id: number) {
    const toDelete = await this.noteRepository.findOneOrFail(_id);
    return this.noteRepository.remove(toDelete);
  }
}
