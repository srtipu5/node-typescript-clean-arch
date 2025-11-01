export interface IUserRepository {
  findByMsId(msId: string): Promise<any>;
  findByEmail(email: string): Promise<any>;
  create(data: any): Promise<any>;
  updateRefreshToken(userId: string, token: string): Promise<void>;
}
