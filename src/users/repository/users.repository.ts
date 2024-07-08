import { Injectable } from '@nestjs/common';
import { User } from '../users.entity';
import { DataSource, Repository } from 'typeorm';

@Injectable()
class UsersRepository extends Repository<User> {
  constructor(private readonly dataSource: DataSource) {
    super(User, dataSource.createEntityManager());
  }

  async findById(id: string): Promise<User> {
    return await this.findOneBy({ id });
  }

  async findByEmail(email: string): Promise<User> {
    return await this.findOneBy({ email });
  }
}

export { UsersRepository };
