import { UserModel } from '../../../core/models/userModel';
import { IUserRepository } from '../interfaces/iUserRepository';

export class UserRepository implements IUserRepository {
  async findByEmail(email: string) {
    return UserModel.findOne({ email });
  }

  async findByMsId(msId: string) {
    return UserModel.findOne({ msId });
  }

  async create(user: any) {
    return UserModel.create(user);
  }

  async updateRefreshToken(userId: string, token: string) {
    await UserModel.findByIdAndUpdate(userId, { refreshToken: token });
  }
}
