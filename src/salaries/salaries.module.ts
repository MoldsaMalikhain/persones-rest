/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm/dist/typeorm.module';
import { Currencies } from 'src/entities/currencies.entity';
import { Persones } from 'src/entities/persones.entity';
import { Salaries } from 'src/entities/salaries.entity';
import { SalariesController } from './salaries.controller';
import { SalariesService } from './salaries.service';



@Module({
    imports: [TypeOrmModule.forFeature([Salaries, Currencies, Persones])],
    controllers: [SalariesController],
    providers: [SalariesService],
})
export class SalariesModule {



}
