import { MsAuthService } from './services/msAuthService';
import { JwtService } from './services/jwtService';
import { UserRepository } from './repositorys/userRepository';
import { MsAuthController } from './controllers/msAuthController';
import { TokenMgtController } from './controllers/tokenMgtController';

const msService = new MsAuthService();
const jwtService = new JwtService();
const userRepo = new UserRepository();
const msAuthController = new MsAuthController(msService, jwtService, userRepo);
const tokenMgtController = new TokenMgtController(jwtService, userRepo);

export { msAuthController, tokenMgtController };
