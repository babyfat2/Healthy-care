import { IsEmail, IsEnum, IsNotEmpty, IsString, IsStrongPassword } from "class-validator";
import { EROLE } from "src/global/globalEnum";

export class RegisterDto {
    @IsNotEmpty({message: 'username should be not empty'})
    @IsEmail({},{message: 'user naem must be email'})
    username: string;

    @IsNotEmpty({message: 'Passwoud shoudld be not empty'})
    @IsStrongPassword()
    password: string;

    @IsNotEmpty({message: 'full_name shoudld be not empty'})
    @IsString()
    full_name: string;

    @IsNotEmpty({ message: 'Role should not be empty' })
    @IsEnum(EROLE, { message: 'Invalid role type' })
    role: EROLE;
}