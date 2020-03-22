import {Document} from 'mongoose';
import { crypto} from 'bcrypt';

export interface User extends Document {
    checkPassword(password: string, arg1: (err: any, isMatch: any) => void);
    
    readonly username : string;
    readonly password : string;
    readonly email    : string;
    readonly roles    :[string];
}


