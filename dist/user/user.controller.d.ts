import { UserService } from './user.service';
import { User } from './entity/user.entity';
import { PhoneDto } from './dto/phone.dto';
import { NicknameDto } from './dto/nickname.dto';
import { GetIsExistUserResponse } from "./entity/get-is-exist-user-response.interface";
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    getAllUsers(): Promise<User[]>;
    getUserById(params: any): Promise<User>;
    getIsExistUserByPhone({ phone }: PhoneDto): Promise<GetIsExistUserResponse>;
    getIsExistUserByNickname({ nickname }: NicknameDto): Promise<GetIsExistUserResponse>;
}
