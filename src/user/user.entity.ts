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
  name: string;

  @ManyToMany(() => Group, (groups) => groups.users, {
    cascade: true,
  })
  @JoinTable()
  groups: Group[];

  @ManyToMany(() => User, {
    cascade: true,
  })
  @JoinTable()
  friends: User[];
}
