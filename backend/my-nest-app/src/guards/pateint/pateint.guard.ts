import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { EROLE } from 'src/global/globalEnum';
import { PatientService } from 'src/modules/pateint/patient.service';


@Injectable()
export class PatientGuard extends AuthGuard('jwt') {
  constructor(private readonly patientService: PatientService) {
      super();
    }
  
    async canActivate(context: ExecutionContext): Promise<boolean> {
      const request = context.switchToHttp().getRequest();
      const user = request.user;
  
      if (!user) {
        throw new UnauthorizedException('Unauthorized');
      }
  
      // ✅ Kiểm tra quyền truy cập
      if (user.role !== EROLE.PATIENT) {
        throw new UnauthorizedException('Unauthorized access');
      }
      
      try {
        //Lấy thông tin bệnh nhân từ database
        const patient = await this.patientService.getpatientById(user.id);
        if (!patient) {
          throw new UnauthorizedException('No patient found');
        }
  
        // Gán thông tin id bệnh nhân gán vào `request`
        request.patient_id = patient.id;
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
