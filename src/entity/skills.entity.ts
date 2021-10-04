import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Skills {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    length: 255,
  })
  name: string;
}
