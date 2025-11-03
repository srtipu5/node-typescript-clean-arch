export interface IUserRepository {
  create(data: any): Promise<any>;
  updateById(Id: string, data: any): Promise<void>;
  findById(id: string): Promise<any>;
  findByEmail(email: string): Promise<any>;
}
