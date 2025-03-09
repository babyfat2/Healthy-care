import { IsEmail, IsNotEmpty, IsOptional } from 'class-validator';
export class MailResetPasswordDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;
}

export class VerifyTokenDto {
  @IsNotEmpty()
  token: string;    
}   