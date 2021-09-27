import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from 'src/entity/role.entity';
import { getRepository, Repository } from 'typeorm';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role) private roleRepository: Repository<Role>,
  ) {}

  async findByName(name: string) {
    const byName = await this.roleRepository.findOneOrFail({
      where: { role: name },
    });
    if (!byName) return null;

    return byName;
  }

  async create(_name: any) {
    const { name } = _name;
    const qb = getRepository(Role)
      .createQueryBuilder('role')
      .where('role.role = :name', { name });
    const rl = qb.getOne();
    if (rl) return null;

    const newRole = new Role();

    newRole.role = name;

    const created = await this.roleRepository.save(newRole);
    return created;
  }
}
