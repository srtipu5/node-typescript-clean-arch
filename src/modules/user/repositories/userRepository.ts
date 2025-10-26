import { IUser } from '../interfaces/iUser';
import { UserModel } from '../models/userModel';

export class UserRepository {
  async findByEmail(email: string): Promise<IUser | null> {
    return UserModel.findOne({ email }).lean();
  }

  async create(user: IUser): Promise<IUser> {
    return UserModel.create(user);
  }
}
