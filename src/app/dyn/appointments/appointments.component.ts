import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AppointmentsService } from '../../serv/appointments.service';
import { Appointment } from '../../model/appointment';
import { NavbarComponent } from '../../comp/navbar/navbar.component';
import { FooterComponent } from '../../comp/footer/footer.component';
import { InfoOverviewDialogComponent } from '../../comp/info-overview-dialog/info-overview-dialog.component';

import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
} from '@angular/material/dialog';

@Component({
  selector: 'app-appointments',
  standalone: true,
  imports: [CommonModule, NavbarComponent, FooterComponent, MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose],
  templateUrl: './appointments.component.html',
  styleUrl: './appointments.component.scss'
})
export class AppointmentsComponent {
  previousAppointments: Appointment[] = [];
  upcomingAppointments: Appointment[] = [];

  constructor(private appointmentsService: AppointmentsService, public dialog: MatDialog) {}

  ngOnInit(): void {
    const appointments = this.appointmentsService.getAppointments();

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

  openInfoDialog(appointment: Appointment): void {
    const dialogRef = this.dialog.open(InfoOverviewDialogComponent, {
      data: appointment,
    });
  }
}
