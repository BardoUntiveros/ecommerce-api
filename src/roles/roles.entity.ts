import { Entity, Column, PrimaryGeneratedColumn, ManyToMany } from 'typeorm';
import { User } from '../users/users.entity';
import { RoleName } from './roles.enum';

@Entity()
class Role {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'enum',
    enum: RoleName,
    unique: true,
  })
  name: RoleName;

  @ManyToMany(() => User, (user) => user.roles)
  users: User[];
}

export { Role };
