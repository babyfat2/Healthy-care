import { ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { EROLE } from 'src/global/globalEnum';
import { HospitalService } from 'src/modules/hospital/hospital.service';
import { ReceptionService } from 'src/modules/reception/reception.service';

@Injectable()
export class ReceptionAuthGuard extends AuthGuard('jwt') {

  constructor(
    private readonly receptionService: ReceptionService,
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
    if (user.role != EROLE.RECEPTION) {
      throw new UnauthorizedException('Unauthorized access');
    }

    try {

        const hospital = await this.receptionService.getHospitalWork(user.id);
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
