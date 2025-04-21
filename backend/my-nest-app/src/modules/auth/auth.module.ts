import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from 'src/configs/auth.config';
import { JwtStrategy } from 'src/strategy/jwt-strategy';
import { UserModule } from '../user/user.module';
import { PassportModule } from '@nestjs/passport';
import { Patient } from 'src/entities/patient.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Patient]),
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: jwtConstants.expiredTime },
    }),
    UserModule,
    PassportModule, 
  ],
  controllers: [AuthController],
  providers: [AuthService , JwtStrategy],
  exports: [AuthService, JwtModule],
})
export class AuthModule {}
