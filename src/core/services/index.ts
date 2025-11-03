import { userRepo } from '../repositorys';
import { JwtService } from './jwtService';
import { MicrosoftService } from './microsoftService';

export const jwtService = new JwtService(userRepo);
export const msService = new MicrosoftService();
