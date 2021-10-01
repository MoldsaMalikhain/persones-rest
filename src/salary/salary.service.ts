import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import CreateSalarysDto from 'src/dto/create/salary-create.dto';
import { Currencies } from 'src/entity/currencies.entity';
import { CurrencyRecords } from 'src/entity/currency-records.entity';
import { Person } from 'src/entity/person.entity';
import { Salaries } from 'src/entity/salaries.entity';
import { PersonService } from 'src/person/person.service';
import { getRepository, Repository } from 'typeorm';
import { SalaryRO } from './salary.interface';

@Injectable()
export class SalaryService {
  constructor(
    @InjectRepository(Salaries)
    private salariesRepository: Repository<Salaries>,
    @InjectRepository(CurrencyRecords)
    private recordRepository: Repository<CurrencyRecords>,
    @InjectRepository(Currencies)
    private currencyRepository: Repository<Currencies>,
    @InjectRepository(Person) private personeRepository: Repository<Person>,
    private readonly personeService: PersonService,
  ) {}

  // async create(salaryDetails: CreateSalarysDto): Promise<Salaries> {
  //   const { amount, currency, start_date, end_date, person, record } =
  //     salaryDetails;

  //   console.log(person);

  //   const insert = `INSERT INTO salaries(amount, startDate, endDate, personId, recordId, currencyId)
  //   VALUES (${amount}, ${start_date}, ${end_date},
  //     (SELECT id FROM person WHERE username = '${person}'),
  //     (SELECT id FROM currency_records WHERE id = ${record}),
  //     (SELECT id FROM currencies WHERE id = ${currency})
  //   );`;

  //   //
  //   try {
  //     return await getRepository(Salaries).query(insert);
  //     // const created = await this.salariesRepository.save(newSalary);
  //     // return await this.buildRO(created);
  //   } catch (error) {
  //     throw new HttpException(
  //       { message: 'Data save faild', error },
  //       HttpStatus.BAD_REQUEST,
  //     );
  //   }
  // }

  async create(salaryDetails: CreateSalarysDto): Promise<SalaryRO> {
    const { amount, currency, start_date, end_date, person, record } =
      salaryDetails;

    const newSalary = new Salaries();

    newSalary.amount = amount;
    newSalary.startDate = start_date;
    newSalary.endDate = end_date;
    newSalary.record = null;

    const personName = await this.personeRepository.findOneOrFail({
      where: { username: person },
    });

    newSalary.person = personName;
    newSalary.record = await this.recordRepository.findOneOrFail(record);
    newSalary.currency = await this.currencyRepository.findOneOrFail(currency);

    try {
      const created = await this.salariesRepository.save(newSalary);
      return await this.buildRO(created);
    } catch (error) {
      throw new HttpException(
        { message: 'Data save faild', error },
        HttpStatus.BAD_REQUEST,
      );
    }
    // console.log(newSalary);

    // console.log(await this.salariesRepository.save(newSalary));
    // console.log(await getRepository(Salaries).query(insert));
  }

  async update(
    _id: number,
    salaryDetails: CreateSalarysDto,
  ): Promise<Salaries> {
    const toUpdate = await this.salariesRepository.findOneOrFail(_id);
    if (!toUpdate) return null;

    const updated = await Object.assign(salaryDetails, toUpdate);
    return this.salariesRepository.save(updated);
  }

  async getById(_id: number): Promise<Salaries> {
    const byId = await this.salariesRepository.findOneOrFail({
      where: { id: _id },
      relations: ['currency', 'person', 'record'],
    });
    if (!byId) return null;
    return byId;
  }

  async getAll(): Promise<Salaries[]> {
    return await this.salariesRepository.find({
      relations: ['currency', 'person', 'record'],
    });
  }

  async delete(_id: number): Promise<Salaries> {
    const toDelete = await this.getById(_id);
    return await this.salariesRepository.remove(toDelete);
  }

  async buildRO(_salary: Salaries) {
    const salaryRo = {
      id: _salary.id,
      amount: _salary.amount,
      currency: _salary.currency,
      start_date: _salary.startDate,
      end_date: _salary.endDate,
      person: _salary.person,
      record: _salary.record,
    };
    return { salary: salaryRo };
  }
}
