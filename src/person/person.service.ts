import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm/dist/common/typeorm.decorators';
import CreatePersonesDto from 'src/dto/create/person-create.dto';
import LoginDto from 'src/dto/login.dto';
import UpdatePersonesDto from 'src/dto/update/person-update.dto';
import { Person } from 'src/entity/person.entity';
import { Role } from 'src/entity/role.entity';
import { RoleService } from 'src/role/role.service';
import { getRepository, Repository } from 'typeorm';
import { PersonRO } from './person.interface';

export type User = any;

@Injectable()
export class PersonService {
  constructor(
    @InjectRepository(Person) private personRepository: Repository<Person>,
    @InjectRepository(Role) private roleRepository: Repository<Role>,
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
      .where('person.username = :username', { username })
      .orWhere('person.nameOnProject = :nameOnProject', { nameOnProject });
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

  async findForRegister(registerDto: CreatePersonesDto) {
    const toRegister = this.personRepository.findOne({
      where: {
        username: registerDto.username,
        nameOnProject: registerDto.nameOnProject,
      },
    });
    if (!toRegister) return false;
    return true;
  }

  async findByName(username: string) {
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
      role: _person.role,
    };
    return { person: personRo };
  }
}
