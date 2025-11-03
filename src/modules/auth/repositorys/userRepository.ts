import { UserModel } from '../../../core/models/userModel';
import { IUserRepository } from '../interfaces/iUserRepository';

export class UserRepository implements IUserRepository {
  async create(user: any) {
    return UserModel.create(user);
  }

  async updateById(id: string, data: any) {
    await UserModel.findByIdAndUpdate(id, {
      ...data,
    });
  }

  async findById(id: string) {
    return UserModel.findById(id);
  }

  async findByEmail(email: string) {
    return UserModel.findOne({ email });
  }
}
