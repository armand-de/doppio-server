import { User } from './entity/user.entity';
import { Repository } from 'typeorm';
import { LoginUserDto } from '../auth/dto/login-user.dto';
import { ReturnUser } from '../auth/interface/return-user.interface';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PhoneDto } from './dto/phone.dto';
import { NicknameDto } from './dto/nickname.dto';
export declare class UserService {
    private userRepository;
    constructor(userRepository: Repository<User>);
    createUser(createUserDto: CreateUserDto): Promise<void>;
    updateUser(updateUserDto: UpdateUserDto): Promise<void>;
    deleteUser(id: string): Promise<void>;
    getAllUsers(): Promise<User[]>;
    getUserById(id: string): Promise<User>;
    getUserByPhone(phoneDto: PhoneDto): Promise<User>;
    getUserByNickname({ nickname }: NicknameDto): Promise<User>;
    findByLogin({ nickname, password: input, }: LoginUserDto): Promise<ReturnUser>;
    getUserIsExistByPhone(phoneDto: PhoneDto): Promise<boolean>;
    getUserIsExistByNickname(nicknameDto: NicknameDto): Promise<boolean>;
    private getIsPasswordEqual;
    private getUserDataByDynamicData;
}
