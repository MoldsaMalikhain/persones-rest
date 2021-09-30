import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import CreateCompaniesDto from 'src/dto/create/company-create.dto';
import { Companies } from 'src/entity/companies.entity';
import { getRepository, Repository } from 'typeorm';

@Injectable()
export class CompanyService {
  constructor(
    @InjectRepository(Companies)
    private companyRepository: Repository<Companies>,
  ) {}

  async create(companyDetails: CreateCompaniesDto): Promise<Companies> {
    const { name, contacts, createTime } = companyDetails;

    const qb = await getRepository(Companies)
      .createQueryBuilder('companies')
      .where('companies.name = :name', { name });
    const co = await qb.getOne();
    if (co) {
      const err = { name: 'Name must be unique' };
      throw new HttpException(
        { message: 'Input data validation faild', err },
        HttpStatus.BAD_REQUEST,
      );
    }

    const newCompany = new Companies();

    newCompany.name = name;
    newCompany.contacts = contacts;
    newCompany.createTime = createTime;

    try {
      const created = await this.companyRepository.save(newCompany);
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
    companyDetails: CreateCompaniesDto,
  ): Promise<Companies> {
    const toUpdate = await this.companyRepository.findOneOrFail(_id);
    if (!toUpdate) return null;

    const updated = await Object.assign(companyDetails, toUpdate);
    return updated;
  }

  async getAll(): Promise<Companies[]> {
    return await this.companyRepository.find({});
  }

  async getByName(_name: string): Promise<Companies> {
    const byName = await this.companyRepository.findOneOrFail({
      where: { name: _name },
    });
    if (!byName) return null;
    return byName;
  }

  async getById(_id: number): Promise<Companies> {
    const byId = await this.companyRepository.findOneOrFail(_id);
    if (!byId) return null;
    return byId;
  }

  async delete(_id: number): Promise<Companies> {
    const toDelete = await this.companyRepository.findOneOrFail(_id);
    if (!toDelete) return null;
    return await this.companyRepository.remove(toDelete);
  }
}
