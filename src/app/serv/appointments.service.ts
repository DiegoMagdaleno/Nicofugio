import { Injectable } from '@angular/core';
import { Appointment } from '../model/appointment';

@Injectable({
  providedIn: 'root'
})
export class AppointmentsService {

  constructor() { }

  getAppointments(): Appointment[] {
    return JSON.parse(localStorage.getItem('appointments') || '[]');
  }

  saveAppointments(appointments: Appointment[]): void {
    localStorage.setItem('appointments', JSON.stringify(appointments));
  }

  addAppointment(appointment: Appointment): void {
    const appointments = this.getAppointments();
    appointments.push(appointment);
    this.saveAppointments(appointments);
  }

  getAppointment(id: number): Appointment {
    const appointments = this.getAppointments();
    return appointments.find(a => a.id === id) as Appointment;
  }

  getAppointmentsAt(date: string): Appointment[] {
    const appointments = this.getAppointments();
    return appointments.filter(a => a.date === date);
  }

  getAppointmentsForPet(petId: number): Appointment[] {
    const appointments = this.getAppointments();
    return appointments.filter(a => a.petId === petId);
  }
}
