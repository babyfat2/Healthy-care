import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { DataSource, In, Repository } from 'typeorm';
import { LoginDto } from './dto/auth.dto';
import { ResponseData } from 'src/global/globalClass';
import { HttpStatusCode, HttpStatusMessage } from 'src/global/globalMessage';
import { TPayloadJwt } from './auth.interface';
import * as crypto from 'crypto';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from 'src/configs/auth.config';
import { EROLE } from 'src/global/globalEnum';
import { MailResetPasswordDto, VerifyTokenDto } from './dto/send-email.dto';
import { JwtPayload } from 'src/configs/jwt/jwtPayload.type';
import { MailerService } from '@nestjs-modules/mailer';
import { RegisterDto } from './dto/register.dto';
import { Patient } from 'src/entities/patient.entity';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User)
        private readonly userRespository: Repository<User>,
        @InjectRepository(Patient)
        private readonly pateintRespository: Repository<Patient>,
        private readonly jwtService: JwtService,
        private readonly mailerService: MailerService,
        @InjectDataSource()
    private readonly dataSource: DataSource,
    ) {

    }
    createToken(email: string, id: number, role: EROLE) {
        const payload: TPayloadJwt = {
            id: id,
            email: email,
            role: role,
        };
        const refreshPayload = {
            ...payload,
            hash: crypto.createHash('md5').update(role).digest('hex'),
        };

        return {
            accessToken: this.jwtService.sign(payload),
            refreshToken: this.jwtService.sign(refreshPayload, {
                expiresIn: '90d',
                secret: jwtConstants.secret,
            })
        }
    }

    async login(userInfor: LoginDto) {
        const user = await this.userRespository.findOneBy({ email: userInfor.username, role: EROLE.PATIENT })

        if (!user) {
            return new ResponseData(
                null,
                HttpStatusCode.NOT_FOUND,
                HttpStatusMessage.USER_NOT_FOUND,
            )
        }
        
        const data = {
            full_name: user.full_name,
        }
        const token = this.createToken(user.email, user.id, user.role);

        return new ResponseData(
            { data: data, token: token },
            HttpStatusCode.SUCCESS,
            HttpStatusMessage.LOGIN_SUCCESS,
        )
    }

    async register(body: RegisterDto) {
        // Kiểm tra email đã tồn tại
        const existingUser = await this.userRespository.findOne({
            where: { email: body.username },
        });

        if (existingUser) {
            return new ResponseData(
                null,
                HttpStatus.CONFLICT,
                'Email đã tồn tại',
            );
        }
        await this.userRespository.save({
            email: body.username,
            full_name: body.full_name,
            password: body.password,
            role: body.role,
        });


        return new ResponseData(
            null,
            HttpStatus.CREATED,
            'Đăng ký thành công',
        );
    }

    async loginWeb(userInfor: LoginDto) {
        const user = await this.userRespository.findOneBy({ email: userInfor.username, role: In([EROLE.CLINICAL_DOCTOR,EROLE.HOSPITAL, EROLE.RECEPTION, EROLE.PARACLINICAL_DOCTOR])})

        if (!user) {
            return new ResponseData(
                null,
                HttpStatusCode.NOT_FOUND,
                HttpStatusMessage.USER_NOT_FOUND,
            )
        }

        if (user.password !== userInfor.password) {
            return new ResponseData(
                null,
                HttpStatusCode.NOT_FOUND,
                HttpStatusMessage.PASSWORD_INCORRECT,
            )
        }

        const token = this.createToken(user.email, user.id, user.role);

        const data = {
            role: user.role,
            full_name: user.full_name,
        }

        return new ResponseData(
            { data: data, token: token },
            HttpStatusCode.SUCCESS,
            HttpStatusMessage.LOGIN_SUCCESS,
        )
    }

    async sendEmailResetPassword(data: MailResetPasswordDto) {
        const user = await this.userRespository.findOneBy({ email: data.email });
        if (!user) {
            return new ResponseData(
                null,
                HttpStatusCode.NOT_FOUND,
                HttpStatusMessage.USER_NOT_FOUND,
            );
        }

        const jwtPayload: JwtPayload = {
            sub: user.id,
            email: user.email,
        };

        const passwordResetToken = await this.jwtService.signAsync(jwtPayload, {
            secret: process.env.JWT_ACCESS_TOKEN_SECRET,
            expiresIn: '1d',
        });

        // Save token to check
        await this.userRespository.update(user.id, {
            resetToken: passwordResetToken,
        });

        try {
            // Send email to user
            await this.mailerService.sendMail({
                to: data.email,
                subject: '(Healthy-care) Xác nhận thay đổi mật khẩu',
                template: './forgot-password',
                context: {
                    email: data.email,
                    url: process.env.FRONTEND_WEB_SITE + "change-password/" + passwordResetToken,
                },

            });
            return new ResponseData(
                null,
                HttpStatusCode.SUCCESS,
                HttpStatusMessage.PLEASE_CONFIRM_EMAIL,
            );
        } catch (e) {
            return new ResponseData(
                null,
                HttpStatusCode.BAD_REQUEST,
                HttpStatusMessage.ERROR_SEND_EMAIL,
            );
        }
    }


    async verifyToken(token: VerifyTokenDto) {
        try {
            // Decodes and verifies the JWT token using the provided secret key.
            const decoded = this.jwtService.verify(token.token, {
                secret: process.env.JWT_ACCESS_TOKEN_SECRET,
            }); 
            if (!decoded) {
    
                return new ResponseData(
                    null,
                    HttpStatus.UNAUTHORIZED,
                    HttpStatusMessage.TOKEN_EXPIRED,
                );
            }
            return new ResponseData(
                null,
                HttpStatusCode.SUCCESS,
                HttpStatusMessage.TOKEN_VERIFY,
            )
        } catch (e) {
            return new ResponseData(
                null,
                HttpStatus.UNAUTHORIZED,
                HttpStatusMessage.TOKEN_EXPIRED,
            );
        }
    }
}