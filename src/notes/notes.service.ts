/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Notes } from 'src/entities/notes.entity';
import { Persones } from 'src/entities/persones.entity';
import { Repository } from 'typeorm';
import CreateNotesDto from './create-notes.dto';

@Injectable()
export class NotesService {

    constructor(
        @InjectRepository(Notes) private notesRepository: Repository<Notes>,
        @InjectRepository(Repository) private personesRepository: Repository<Persones>
    ) { }

    async create(notesDetails: CreateNotesDto): Promise<Notes> {

        const notesEntity: Notes = this.notesRepository.create()
        const {
            name,
            date,
            user_m,
            user_p,
        } = notesDetails;

        notesEntity.name = name;
        notesEntity.date = date;
        notesEntity.user_m = await this.personesRepository.findOneOrFail(user_m)
        notesEntity.user_p = await this.personesRepository.findOneOrFail(user_p)

        await this.notesRepository.save(notesEntity)
        return notesEntity;
    }

    async getAll() {
        return this.notesRepository.find()
    }

    async getById(_id: number) {
        return this.notesRepository.findOneOrFail({ where: { id: _id } })
    }

}
