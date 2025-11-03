import { MicrosoftService } from './services/microsoftService';
import { JwtService } from './services/jwtService';
import { UserRepository } from './repositorys/userRepository';
import { MicrosoftController } from './controllers/microsoftController';
import { TokenMgtController } from './controllers/tokenMgtController';

const userRepo = new UserRepository();
const msService = new MicrosoftService();
const jwtService = new JwtService(userRepo);
const msController = new MicrosoftController(msService, jwtService, userRepo);
const tokenMgtController = new TokenMgtController(jwtService, userRepo);

export { msService, jwtService, userRepo, msController, tokenMgtController };
