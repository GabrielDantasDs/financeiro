import { IsEmail, IsString, Matches, MaxLength, MinLength } from "class-validator";
import { User } from "../entities/user.entity";

export class CreateUserDto implements User{
    @IsString()
    name: string;

    @IsEmail()
    email: string;

    @IsString()
    @MinLength(4)
    @MaxLength(20)
    @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
        message: 'senha muito fraca!'
    })
    password: string;
}
