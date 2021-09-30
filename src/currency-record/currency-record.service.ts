import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import CreateCurrencyRecordsDto from 'src/dto/create/currency.records-create.dto';
import { Companies } from 'src/entity/companies.entity';
import { Currencies } from 'src/entity/currencies.entity';
import { CurrencyRecords } from 'src/entity/currency-records.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CurrencyRecordService {
  constructor(
    @InjectRepository(CurrencyRecords)
    private currencyRecRepository: Repository<CurrencyRecords>,
    @InjectRepository(Currencies)
    private currencyRepository: Repository<Currencies>,
    @InjectRepository(Companies)
    private companiesRepository: Repository<Companies>,
  ) {}

  async create(recordsDto: CreateCurrencyRecordsDto): Promise<CurrencyRecords> {
    const {
      projectSalary,
      bankRate,
      taxRate,
      net,
      month,
      operationDate,
      currency,
      company,
    } = recordsDto;

    const newRecord = new CurrencyRecords();

    newRecord.projectSalary = projectSalary;
    newRecord.bankRate = bankRate;
    newRecord.taxRate = taxRate;
    newRecord.net = net;
    newRecord.month = month;
    newRecord.operationDate = operationDate;

    newRecord.currency = await this.currencyRepository.findOneOrFail(currency);
    newRecord.company = await this.companiesRepository.findOneOrFail(company);

    try {
      const created = await this.currencyRecRepository.save(newRecord);
      return created;
    } catch (error) {
      throw new HttpException(
        { message: 'Data save faild', error },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async update(
    _id: number,
    recordDetails: CreateCurrencyRecordsDto,
  ): Promise<CurrencyRecords> {
    const toUpdate = await this.currencyRecRepository.findOneOrFail(_id);
    if (!toUpdate) return null;

    const updated = await Object.assign(recordDetails, toUpdate);
    return updated;
  }

  async getAll(): Promise<CurrencyRecords[]> {
    return this.currencyRecRepository.find({
      relations: ['currency', 'company'],
    });
  }

  async getByBankRate(_rate: number): Promise<CurrencyRecords> {
    const byRate = await this.currencyRecRepository.findOneOrFail({
      where: {
        bankRate: _rate,
      },
    });
    if (!byRate) return null;
    return byRate;
  }

  async getByTaxRate(_rate: number): Promise<CurrencyRecords> {
    const byRate = await this.currencyRecRepository.findOneOrFail({
      where: {
        taxRate: _rate,
      },
    });
    if (!byRate) return null;
    return byRate;
  }

  async getById(_id: number): Promise<CurrencyRecords> {
    const byId = await this.currencyRecRepository.findOneOrFail(_id);
    if (!byId) return null;
    return byId;
  }

  async delete(_id: number): Promise<CurrencyRecords> {
    const toDelete = await this.getById(_id);
    return this.currencyRecRepository.remove(toDelete);
  }
}
