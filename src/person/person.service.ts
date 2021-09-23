import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm/dist/common/typeorm.decorators';
import CreatePersonesDto from 'src/dto/create/person-create.dto';
import UpdatePersonesDto from 'src/dto/update/person-update.dto';
import { Person } from 'src/entity/person.entity';
import { getRepository, Repository } from 'typeorm';
import { PersonRO } from './person.interface';

export type User = any;

@Injectable()
export class PersonService {
  constructor(
    @InjectRepository(Person) private personRepository: Repository<Person>,
  ) {}

  private readonly users = [
    {
      userId: 1,
      username: 'Testus',
      password: 'password',
      isAdmin: false,
    },
    {
      userId: 2,
      username: 'SomeDude',
      password: 'passnotword',
      isAdmin: true,
    },
  ];

  async create(personeDetails: CreatePersonesDto): Promise<PersonRO> {
    const {
      username,
      age,
      nameOnProject,
      startDate,
      endDate,
      englishLvl,
      password,
    } = personeDetails;

    const qb = getRepository(Person)
      .createQueryBuilder('person')
      .where('person.username = :username', { username })
      .orWhere('person.nameOnProject = :nameOnProject', { nameOnProject });
    const pr = qb.getOne();

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
    newPerson.startDate = startDate;
    newPerson.password = password;
    newPerson.username = username;
    newPerson.endDate = endDate;
    newPerson.age = age;

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

    // const {
    //   username,
    //   age,
    //   nameOnProject,
    //   startDate,
    //   endDate,
    //   englishLvl,
    //   password,
    // } = personeDetails;

    const updated = await Object.assign(personeDetails, toUpdate);
    return this.personRepository.save(updated);
  }

  async getAll(): Promise<Person[]> {
    return await this.personRepository.find({});
  }

  async getById(_id: number): Promise<Person> {
    return await this.personRepository.findOneOrFail(_id);
  }

  async delete(_id: number): Promise<Person> {
    const toDelete = await this.personRepository.findOneOrFail(_id);
    if (!toDelete) return null;
    return await this.personRepository.remove(toDelete);
  }

  async findOne(username: string): Promise<User | undefined> {
    return await this.users.find((user) => user.username === username);
  }

  async buildPersonRo(_person) {
    const personRo = {
      id: _person.id,
      nameOnProject: _person.nameOnProject,
      englishLvl: _person.englishLvl,
      startDate: _person.startDate,
      password: _person.password,
      username: _person.username,
      endDate: _person.endDate,
      age: _person.age,
    };
    return { person: personRo };
  }
}
