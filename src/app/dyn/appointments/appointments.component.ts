import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AppointmentsService } from '../../serv/appointments.service';
import { Appointment } from '../../model/appointment';
import { NavbarComponent } from '../../comp/navbar/navbar.component';

@Component({
  selector: 'app-appointments',
  standalone: true,
  imports: [CommonModule, NavbarComponent],
  templateUrl: './appointments.component.html',
  styleUrl: './appointments.component.css'
})
export class AppointmentsComponent {
  previousAppointments: Appointment[] = [];
  upcomingAppointments: Appointment[] = [];

  constructor(private appointmentsService: AppointmentsService) {}

  ngOnInit(): void {
    const appointments = this.appointmentsService.getAppointments();

    console.log(appointments);

    const currentDate = new Date();
    this.previousAppointments = appointments.filter(appointment => {
      const appointmentDateTime = new Date(`${appointment.date} ${appointment.time}`);
      return appointmentDateTime < currentDate;
    });    

    this.upcomingAppointments = appointments.filter(appointment => {
      const appointmentDateTime = new Date(`${appointment.date} ${appointment.time}`);
      return appointmentDateTime >= currentDate;
    });
  }
}
