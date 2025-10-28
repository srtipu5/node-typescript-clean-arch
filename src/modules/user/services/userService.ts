import { IUserService } from '../interfaces/iUserService';
import { CreateUserDto } from '../dtos/createUserDto';
import { IUserRepository } from '../interfaces/iUserRepository';

export class UserService implements IUserService {
  constructor(private repo: IUserRepository) {}

  async register(data: CreateUserDto) {
    const existing = await this.repo.findByEmail(data.email);
    if (existing) throw new Error('User already exists');

    return this.repo.create(data);
  }
}
