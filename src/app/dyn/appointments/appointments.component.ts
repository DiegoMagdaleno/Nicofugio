import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AppointmentsService } from '../../serv/appointments.service';
import { Appointment } from '../../model/appointment';

@Component({
  selector: 'app-appointments',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './appointments.component.html',
  styleUrl: './appointments.component.css'
})
export class AppointmentsComponent {
  appointments: Appointment[] = [];

  constructor(private appointmentsService: AppointmentsService) {}

  ngOnInit(): void {
    this.appointments = this.appointmentsService.getAppointments();
  }
}
