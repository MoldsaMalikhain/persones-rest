/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Persones } from 'src/entities/persones.entity';
import { Roles } from 'src/entities/roles.entity';
import { Repository } from 'typeorm';
import CreateRolesDto from './create-roles.dto';

@Injectable()
export class RolesService {

    constructor(
        @InjectRepository(Roles) private roleRepository: Repository<Roles>,
        @InjectRepository(Persones) private personesRepository: Repository<Persones>
    ) { }

    async inject(roleDetails: CreateRolesDto): Promise<Roles> {

        const roleEntity: Roles = this.roleRepository.create()

        const {
            name,
            persones
        } = roleDetails;

        roleEntity.name = name;
        roleEntity.persone = []

        for (let item = 0; item < persones.length; item++) {
            const role = await this.personesRepository.findOneOrFail(persones[item])
            roleEntity.persone.push(role);
        }

        await this.roleRepository.save(roleEntity);
        return roleEntity;
    }

    async getAll() {
        return this.roleRepository.find()
    }

    async getById(_id: number) {
        return this.roleRepository.findOneOrFail({ where: { id: _id } })
    }

}
