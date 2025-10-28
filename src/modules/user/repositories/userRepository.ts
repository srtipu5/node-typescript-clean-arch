import { IUserRepository } from '../interfaces/iUserRepository';
import { UserModel } from '../models/userModel';
import { IUser } from '../models/userModel';

export class UserRepository implements IUserRepository {
  async findByEmail(email: string): Promise<IUser | null> {
    return UserModel.findOne({ email }).lean();
  }

  async create(user: IUser): Promise<IUser> {
    return UserModel.create(user);
  }
}
