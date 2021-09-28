import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm/dist/common/typeorm.decorators';
import CreateNotesDto from 'src/dto/create/note-create.dto';
import CreatePersonesDto from 'src/dto/create/person-create.dto';
import UpdatePersonesDto from 'src/dto/update/person-update.dto';
import { Absences } from 'src/entity/absences.entity';
import { Notes } from 'src/entity/notes.entity';
import { Person } from 'src/entity/person.entity';
import { Role } from 'src/entity/role.entity';
import { Salaries } from 'src/entity/salaries.entity';
import { Skills } from 'src/entity/skills.entity';
import pushIn from 'src/pushIn';
import { RoleService } from 'src/role/role.service';
import { getRepository, Repository } from 'typeorm';
import { PersonRO } from './person.interface';

export type User = any;

@Injectable()
export class PersonService {
  constructor(
    @InjectRepository(Person) private personRepository: Repository<Person>,
    @InjectRepository(Role) private roleRepository: Repository<Role>,
    @InjectRepository(Notes) private notesRepository: Repository<Notes>,
    @InjectRepository(Absences)
    private absencesRepository: Repository<Absences>,
    @InjectRepository(Salaries)
    private salariesRepository: Repository<Salaries>,
    @InjectRepository(Skills) private skillsRepository: Repository<Skills>,
    private readonly roleServise: RoleService,
  ) {}

  private readonly users = [
    {
      userId: 1,
      username: 'Testus',
      password: 'password',
      role: 'user',
    },
    {
      userId: 2,
      username: 'SomeDude',
      password: 'passnotword',
      role: 'admin',
    },
  ];

  async create(personeDetails: CreatePersonesDto): Promise<PersonRO> {
    const {
      firstname,
      username,
      age,
      nameOnProject,
      startDate,
      endDate,
      englishLvl,
      password,
      role,
    } = personeDetails;

    const qb = await getRepository(Person)
      .createQueryBuilder('person')
      .where('person.username = :username', { username });
    const pr = await qb.getOne();

    if (pr) {
      const err = { username: 'Name and Name On Project must be unique' };
      throw new HttpException(
        { message: 'Input data validation faild', err },
        HttpStatus.BAD_REQUEST,
      );
    }

    const newPerson = new Person();

    newPerson.nameOnProject = nameOnProject;
    newPerson.englishLvl = englishLvl;
    newPerson.firstname = firstname;
    newPerson.startDate = startDate;
    newPerson.password = password;
    newPerson.username = username;
    newPerson.endDate = endDate;
    newPerson.age = age;

    newPerson.role = null;
    if (role) newPerson.role = await this.roleServise.findByName(role);

    try {
      const savePerson = await this.personRepository.save(newPerson);
      return await this.buildPersonRo(savePerson);
    } catch (error) {
      throw new HttpException(
        { message: 'Data save faild', error },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async update(
    personeDetails: UpdatePersonesDto,
    _id: number,
  ): Promise<Person> {
    const toUpdate = await this.personRepository.findOneOrFail(_id);
    if (!toUpdate) return null;

    const { username, role, skills, notes, absences, salaries, managers } =
      personeDetails;

    const qb = await getRepository(Person)
      .createQueryBuilder('person')
      .where('person.username = :username', { username });
    const pr = await qb.getOne();
    if (pr) {
      const err = { username: 'Name is not eveilable' };
      throw new HttpException(
        { message: 'Input data validation faild', err },
        HttpStatus.BAD_REQUEST,
      );
    }

    toUpdate.role = null;
    if (role) toUpdate.role = await this.roleRepository.findOneOrFail(role);

    toUpdate.skills = await pushIn(skills, this.skillsRepository);
    toUpdate.notes = await pushIn(notes, this.notesRepository);
    toUpdate.notes = await pushIn(managers, this.notesRepository);
    toUpdate.absences = await pushIn(absences, this.absencesRepository);
    toUpdate.salaries = await pushIn(salaries, this.salariesRepository);
    // toUpdate.person = await pushIn(persones, this.personRepository);

    const updated = await Object.assign(personeDetails, toUpdate);
    return this.personRepository.save(updated);
  }

  async createNote(noteDto: CreateNotesDto, person: any) {
    const { name, text, date, persones } = noteDto;

    const newNote = new Notes();

    newNote.name = name;
    newNote.date = date;
    newNote.text = text;

    newNote.person = await pushIn(persones, this.personRepository);
    newNote.user_m = await this.findByName(person.username);

    try {
      return await this.notesRepository.save(newNote);
    } catch (error) {
      throw new HttpException(
        { message: 'Data save faild', error },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async updateNote(updateDto: CreateNotesDto, _id: number) {
    const toUpdate = await this.notesRepository.findOneOrFail(_id);
    console.log(toUpdate);

    const { name, text } = updateDto;

    toUpdate.name = name;
    toUpdate.text = text;
    // if (user_p)
    //   toUpdate.user_p = await this.personRepository.findOneOrFail(user_p);

    try {
      return await this.notesRepository.save(toUpdate);
    } catch (error) {
      throw new HttpException(
        { message: 'Data save faild', error },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async getAll(): Promise<Person[]> {
    return await this.personRepository.find({
      relations: ['managers', 'notes'],
    });
  }

  async getById(_id: number): Promise<Person> {
    return await this.personRepository.findOneOrFail({
      where: { id: _id },
      relations: ['managers', 'notes'],
    });
  }

  async delete(_id: number): Promise<Person> {
    const toDelete = await this.personRepository.findOneOrFail(_id);
    if (!toDelete) return null;
    return await this.personRepository.remove(toDelete);
  }

  async findForRegister(registerDto: CreatePersonesDto): Promise<Person | any> {
    const toRegister = this.personRepository.findOne({
      where: {
        username: registerDto.username,
        nameOnProject: registerDto.nameOnProject,
      },
    });
    if (!toRegister) return false;
    return true;
  }

  async findByName(username: string): Promise<Person> {
    const byName = this.personRepository.findOneOrFail({
      where: {
        username: username,
      },
      relations: ['role'],
    });
    if (!byName) return null;
    console.log(byName);
    return byName;
  }

  async findOne(username: string): Promise<User | undefined> {
    return await this.users.find((user) => user.username === username);
  }

  async buildPersonRo(_person: Person) {
    const personRo = {
      id: _person.id,
      nameOnProject: _person.nameOnProject,
      englishLvl: _person.englishLvl,
      startDate: _person.startDate,
      password: _person.password,
      username: _person.username,
      endDate: _person.endDate,
      age: _person.age,
      role: _person.role,
    };
    return { person: personRo };
  }
}
