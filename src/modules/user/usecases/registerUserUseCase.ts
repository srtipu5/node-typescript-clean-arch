import { UserRepository } from '../repositories/userRepository';
import { CreateUserDto } from '../dtos/createUserDto';

export class RegisterUserUseCase {
  constructor(private readonly userRepo: UserRepository) {}

  async execute(dto: CreateUserDto) {
    const existingUser = await this.userRepo.findByEmail(dto.email);
    if (existingUser) throw new Error('User already exists');

    // const hashed = await hashPassword(dto.password);
    return this.userRepo.create({ ...dto, password: 'dhdhdh' });
  }
}
