import { Injectable } from '@angular/core';
import { Appointment } from '../model/appointment';
import { WebAPIService } from './web/web-api.service';

const URL = 'http://localhost:3000';

@Injectable({
  providedIn: 'root',
})
export class AppointmentsService {
  constructor(private web: WebAPIService) {}

  getAppointments(): Appointment[] {
    let appointments: Appointment[] = [];
    this.web
      .get(`${URL}/appointments`)
      .subscribe((appointments: Appointment[]) => {
        appointments = appointments;
      });
    return appointments;
  }

  addAppointment(appointment: Appointment): void {
    this.web.post(`${URL}/appointments`, appointment).subscribe();
  }

  getAppointment(id: string): Appointment {
    let appointment = {} as Appointment;
    this.web
      .get(`${URL}/appointments/${id}`)
      .subscribe((a: Appointment) => (appointment = a));
    return appointment;
  }

  getAppointmentsAt(date: string): Appointment[] {
    const appointments = this.getAppointments();
    return appointments.filter((a) => a.date === date);
  }

  getAppointmentsForPet(petId: number): Appointment[] {
    const appointments = this.getAppointments();
    return appointments.filter((a) => a.petId === petId);
  }

  getAppointmentsForEmail(email: string) {
    return this.web.get(`${URL}/appointments/email/${email}`);
  }
}
