import { Strategy } from 'passport-local';
import { ReturnUser } from '../interface/return-user.interface';
import { UserService } from '../../user/user.service';
declare const LocalStrategy_base: new (...args: any[]) => Strategy;
export declare class LocalStrategy extends LocalStrategy_base {
    private readonly userService;
    constructor(userService: UserService);
    validate(nickname: string, password: string, done: CallableFunction): Promise<ReturnUser>;
}
export {};
