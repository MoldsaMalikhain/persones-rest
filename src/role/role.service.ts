import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import CreateRoleDto from 'src/dto/create/role-create.dto';
import { Role } from 'src/entity/role.entity';
import { getRepository, Repository } from 'typeorm';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role) private roleRepository: Repository<Role>,
  ) {}

  async create(_name: CreateRoleDto): Promise<Role> {
    const { name } = _name;
    const qb = await getRepository(Role)
      .createQueryBuilder('role')
      .where('role. name = :name', { name });
    const rl = await qb.getOne();
    if (rl) {
      const err = { firstName: 'Name must be unique' };
      throw new HttpException(
        { message: 'Input data validation faild', err },
        HttpStatus.BAD_REQUEST,
      );
    }

    const newRole = new Role();

    newRole.name = name;

    const created = await this.roleRepository.save(newRole);
    return created;
  }

  async findByName(name: string): Promise<Role> {
    const byName = await this.roleRepository.findOneOrFail({
      where: { name: name },
    });
    if (!byName) return null;

    return byName;
  }

  async findById(_id: number): Promise<Role> {
    const byId = await this.roleRepository.findOneOrFail(_id);
    if (!byId) return null;

    return byId;
  }

  async findAll(): Promise<Role[]> {
    return await this.roleRepository.find();
  }

  async delete(_id: number): Promise<Role> {
    const toDelete = await this.roleRepository.findOneOrFail(_id);
    if (!toDelete) return null;

    return await this.roleRepository.remove(toDelete);
  }
}
