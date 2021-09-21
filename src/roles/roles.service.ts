/* eslint-disable prettier/prettier */
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Persones } from 'src/entity/persones.entity';
import { Roles } from 'src/entity/roles.entity';
import { getRepository, Repository } from 'typeorm';
import CreateRolesDto from '../dto/create/create-roles.dto';
import pushIn from 'src/pushIn';
import UpdateRolesDto from 'src/dto/update/update-roles.dto';
import { RolesRo } from './roles.interface';

@Injectable()
export class RolesService {

    constructor(
        @InjectRepository(Roles) private roleRepository: Repository<Roles>,
        @InjectRepository(Persones) private personesRepository: Repository<Persones>
    ) { }

    async inject(roleDetails: CreateRolesDto): Promise<RolesRo> {
        const {
            name,
        } = roleDetails;

        const qb = await getRepository(Roles)
            .createQueryBuilder('roles')
            .where('roles.name = :name', { name })
        const rl = await qb.getOne();

        if (rl) {
            const err = { name: 'Name and Name On Project must be unique' }
            throw new HttpException({ message: 'Input data validation faild', err }, HttpStatus.BAD_REQUEST);
        }

        const newRole = new Roles();

        newRole.name = name;
        newRole.persone = [];

        try {
            const saveRole = await this.roleRepository.save(newRole)
            return this.buildRoleRo(saveRole);
        } catch (error) {
            throw new HttpException({ message: 'Data save faild', error }, HttpStatus.BAD_REQUEST);
        }

        // return newRole;
    }

    async update(_id: number, roleDetails: UpdateRolesDto) {

        const toUpdate = await this.roleRepository.findOneOrFail(_id);
        const {
            name,
            persones
        } = roleDetails;
        toUpdate.name = name
        toUpdate.persone = await pushIn(persones, this.personesRepository);

        const updated = Object.assign(roleDetails, toUpdate)
        return await this.roleRepository.save(updated);
    }

    async getAll(): Promise<Roles[]> {
        return this.roleRepository.find()
    }

    async getById(_id: number): Promise<Roles> {
        const getID = await this.roleRepository.findOneOrFail({ where: { id: _id } })
        if (!getID) return null;

        return getID;
    }

    async delete(_id: number) {
        const toDelete = await this.roleRepository.findOneOrFail(_id);
        if (!toDelete) return null;

        return toDelete;
    }


    buildRoleRo(role) {
        const roleRo = {
            name: role.name,
            persones: role.persones
        }
        return { roles: roleRo }
    }

}
