import { MsAuthService } from './services/msAuthService';
import { JwtService } from './services/jwtService';
import { UserRepository } from './repositorys/userRepository';
import { MicrosoftController } from './controllers/microsoftController';
import { TokenMgtController } from './controllers/tokenMgtController';

const msService = new MsAuthService();
const jwtService = new JwtService();
const userRepo = new UserRepository();
const msController = new MicrosoftController(msService, jwtService, userRepo);
const tokenMgtController = new TokenMgtController(jwtService, userRepo);

export { msService, jwtService, userRepo, msController, tokenMgtController };
