import { Component, Inject } from '@angular/core';
import { WebAPIService } from '../../serv/web/web-api.service';
import { Auth } from '@angular/fire/auth';
import { Appointment } from '../../model/appointment';
import { AppointmentsService } from '../../serv/appointments.service';
import { CommonModule } from '@angular/common';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
} from '@angular/material/dialog';
import { AppointmentCardComponent } from '../../comp/appointment-card/appointment-card.component';

@Component({
  selector: 'app-appointments-dialog',
  standalone: true,
  imports: [CommonModule, AppointmentCardComponent],
  templateUrl: './appointments-dialog.component.html',
  styleUrl: './appointments-dialog.component.scss',
})
export class AppointmentsDialogComponent {
  appointments: Appointment[] = [];

  constructor(
    public dialogRef: MatDialogRef<AppointmentsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private appointmentService: AppointmentsService,
    private auth: Auth
  ) {}

  ngOnInit() {
    this.appointmentService.getAppointmentsForEmail(this.auth.currentUser!.email!).subscribe((appointments) => {
      this.appointments = appointments;
    });
  }
}
