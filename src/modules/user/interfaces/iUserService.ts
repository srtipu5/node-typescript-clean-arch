import { CreateUserDto } from '../dtos/createUserDto';
import { IUser } from '../models/userModel';

export interface IUserService {
  register(data: CreateUserDto): Promise<IUser>;
}
