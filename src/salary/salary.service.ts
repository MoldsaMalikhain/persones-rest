/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import CreateSalarysDto from 'src/dto/create/salary-create.dto';
import { Salaries } from 'src/entity/salaries.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SalaryService {

    constructor(@InjectRepository(Salaries) private salariesRepository: Repository<Salaries>) {}

    async create(salaryDetails: CreateSalarysDto){
        
        return;
    }

}
