import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Absences } from 'src/entity/absences.entity';
import { Person } from 'src/entity/person.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AbsenceService {
  constructor(
    @InjectRepository(Absences) private absenceRepository: Repository<Absences>,
    @InjectRepository(Person) private personRepository: Repository<Person>,
  ) {}

  async create(details) {
    const { person } = details;

    const newAbsence = new Absences();

    newAbsence.person = await this.personRepository.findOneOrFail({
      where: { username: person },
    });

    const updated = await Object.assign(details, newAbsence);
    return this.absenceRepository.save(updated);
  }

  async getAll() {
    return await this.absenceRepository.find({});
  }
}
