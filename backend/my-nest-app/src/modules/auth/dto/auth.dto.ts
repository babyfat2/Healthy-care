import { IsEmail, IsNotEmpty, IsString, IsStrongPassword } from "class-validator";

export class LoginDto {
    @IsNotEmpty({message: 'username should be not empty'})
    @IsEmail({},{message: 'user naem must be email'})
    username: string;

    @IsNotEmpty({message: 'Passwoud shoudld be not empty'})
    @IsStrongPassword()
    password: string;
}