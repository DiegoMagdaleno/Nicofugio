import { Component, Inject, OnInit } from '@angular/core';
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
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-appointments-dialog',
  standalone: true,
  imports: [CommonModule, AppointmentCardComponent, MatProgressSpinnerModule],
  templateUrl: './appointments-dialog.component.html',
  styleUrls: ['./appointments-dialog.component.scss'],
})
export class AppointmentsDialogComponent implements OnInit {
  appointments: Appointment[] = [];
  isLoading: boolean = true;

  constructor(
    public dialogRef: MatDialogRef<AppointmentsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private appointmentService: AppointmentsService,
    private auth: Auth
  ) {}

  ngOnInit() {
    this.loadAppointments();
  }

  loadAppointments() {
    this.isLoading = true;
    this.appointmentService
      .getAppointmentsForEmail(this.auth.currentUser!.email!)
      .subscribe((appointments) => {
        this.appointments = appointments;
        this.isLoading = false;
      });
  }

  handleAppointmentDeleted() {
    this.loadAppointments();
  }

  trackByIndex(index: number, appointment: Appointment): number {
    return index;
  }
}
