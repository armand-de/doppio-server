import { AuthService } from './auth.service';
import { JoinUserDto } from './dto/join-user.dto';
import { VerifyUserDto } from './dto/verify-user.dto';
import { GetProfileResponse } from './interface/get-profile-response.interface';
import { StatusResponse } from './interface/status-response.interface';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    joinUser(joinUserDto: JoinUserDto): Promise<StatusResponse>;
    loginUser(req: any, res: any): Promise<StatusResponse>;
    verifyUser(verifyUserDto: VerifyUserDto): Promise<StatusResponse>;
    getProfile(req: any): Promise<GetProfileResponse>;
    logoutUser(res: any): Promise<StatusResponse>;
}
