import { TypeOrmModuleOptions } from '@nestjs/typeorm';
let config: TypeOrmModuleOptions;

export default config = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'Lthgfhjkm01',
  database: 'persones',
  entities: ['dist/**/*.entity{.ts,.js}'],
  synchronize: true,
};
