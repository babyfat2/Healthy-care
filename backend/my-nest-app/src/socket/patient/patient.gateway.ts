import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io'; 

@WebSocketGateway({ cors: true })
export class PatientGateway
{
  @WebSocketServer() server: Server;

  inProgressAppointment() {
    this.server.emit('in_progress_appointment');
  }
}
