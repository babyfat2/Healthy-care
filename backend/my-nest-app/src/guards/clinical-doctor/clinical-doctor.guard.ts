import {  ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { EROLE } from 'src/global/globalEnum';
import { DoctorService } from 'src/modules/doctor/doctor.service';


@Injectable()
export class ClinicalDoctorAuthGuard extends AuthGuard('jwt') {

  constructor(
    private readonly doctorService: DoctorService,
  ) {
    super();
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    
    if (!user) {
      throw new UnauthorizedException('Unauthorized');
    }

    // ✅ Kiểm tra quyền truy cập
    if (user.role != EROLE.CLINICAL_DOCTOR) {
      throw new UnauthorizedException('Unauthorized access');
    }

    try {

        const hospital = await this.doctorService.getMyHospital(user.id);
        if (!hospital) {
          throw new UnauthorizedException('Bạn đang không làm việc ở bất cứ bệnh viện nào bây giờ');
        }
        request.hospital_id = hospital;
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

