import { Injectable } from '@angular/core';
import { WebAPIService } from './web/web-api.service';

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  baseURL = ' http://104.248.21.0:3000';

  constructor(private web: WebAPIService) { }

  sendAppointmentEmail(appointmentId: string) {
    return this.web.post(`${this.baseURL}/email/appointment`, { appointmentId: appointmentId });
  }
}
