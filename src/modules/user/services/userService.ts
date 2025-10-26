import { UserRepository } from '../repositories/userRepository';
import { RegisterUserUseCase } from '../usecases/registerUserUseCase';
import { CreateUserDto } from '../dtos/createUserDto';

export class UserService {
  private registerUserUseCase: RegisterUserUseCase;

  constructor() {
    const repo = new UserRepository();
    this.registerUserUseCase = new RegisterUserUseCase(repo);
  }

  async register(data: CreateUserDto) {
    return this.registerUserUseCase.execute(data);
  }
}
