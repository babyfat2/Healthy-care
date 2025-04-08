import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';
import { EROLE } from 'src/global/globalEnum';
import { HospitalService } from 'src/modules/hospital/hospital.service';
import { UserService } from 'src/modules/user/user.service';

@Injectable()
export class HospitalAuthGuard extends AuthGuard('jwt') {

  constructor(private readonly hospitalService: HospitalService) {
    super();
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (!user) {
      throw new UnauthorizedException('Unauthorized');
    }

    // ✅ Kiểm tra quyền truy cập
    if (user.role !== EROLE.HOSPITAL) {
      throw new UnauthorizedException('Unauthorized access');
    }
    
    try {
      // Lấy thông tin bệnh viện từ database
      const hospital = await this.hospitalService.getHositalById(user.id);
      if (!hospital) {
        throw new UnauthorizedException('No hospital found');
      }

      // Gán thông tin id bệnh viện gán vào `request`
      request.hospital_id = hospital.id;
      return true;
    } catch (error) {
      console.error("❌ Error fetching hospital:", error);
      throw new UnauthorizedException('Error retrieving hospital info');
    }
  }
  
    handleRequest<TUser = any>(err: any, user: TUser): TUser {
      if (err || !user) {
        throw err || new UnauthorizedException('Unauthorized');
      }

      return user;
    }
}
