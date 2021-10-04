import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import CreateCurrencyDto from 'src/dto/create/currency-create.dto';
import { Currencies } from 'src/entity/currencies.entity';
import { getRepository, Repository } from 'typeorm';

@Injectable()
export class CurrencyService {
  constructor(
    @InjectRepository(Currencies)
    private currencyRepository: Repository<Currencies>,
  ) {}

  async create(currencyDetails: CreateCurrencyDto): Promise<Currencies> {
    const { name } = currencyDetails;

    const qb = await getRepository(Currencies)
      .createQueryBuilder('currencies')
      .where('currencies.name = :name', { name });
    const cr = await qb.getOne();

    if (cr) {
      const err = { name: 'Name must be unique' };
      throw new HttpException(
        { message: 'Input data validation faild', err },
        HttpStatus.BAD_REQUEST,
      );
    }

    const newCurrency = new Currencies();

    try {
      const created = Object.assign(currencyDetails, newCurrency);
      return await this.currencyRepository.save(created);
    } catch (error) {
      throw new HttpException(
        { message: 'Data save faild', error },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async update(
    _id: number,
    currencyDetails: CreateCurrencyDto,
  ): Promise<Currencies> {
    const toUpdate = await this.currencyRepository.findOneOrFail(_id);
    if (!toUpdate) return null;

    const updated = await Object.assign(currencyDetails, toUpdate);
    return updated;
  }

  async getAll(): Promise<Currencies[]> {
    return await this.currencyRepository.find({});
  }

  async getById(_id: number): Promise<Currencies> {
    const byId = await this.currencyRepository.findOneOrFail(_id);
    if (!byId) return null;
    return byId;
  }

  async getByName(_name: string): Promise<Currencies> {
    const byName = await this.currencyRepository.findOneOrFail({
      where: { name: _name },
    });
    if (!byName) return null;
    return byName;
  }

  async delete(_id): Promise<Currencies> {
    const toDelete = await this.currencyRepository.findOneOrFail(_id);
    return await this.currencyRepository.remove(toDelete);
  }
}
