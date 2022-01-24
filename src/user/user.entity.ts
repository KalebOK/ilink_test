import { Group } from 'src/group/group.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  passwordHash: string;

  @ManyToMany(() => Group)
  @JoinTable()
  group: Group[];

  @ManyToMany(() => User)
  friends: User[];
}
