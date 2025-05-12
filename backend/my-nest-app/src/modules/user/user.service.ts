import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
    constructor(
            @InjectRepository(User)
            private readonly userRespository: Repository<User>,
        ) {
    
        }

        // lấy thông tin tài khoản đăng nhập
        async getUserById(id: number) {
            return await this.userRespository.findOne({
                where: {
                    id: id,
                },
                select: {
                    id: true,
                    email: true,
                    role: true,
                    avatar: true,
                    full_name: true,
                }
            })
          }
}
