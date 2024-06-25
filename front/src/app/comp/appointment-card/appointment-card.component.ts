import { Component, Input } from '@angular/core';
import { Appointment } from '../../model/appointment';
import { PetsService } from '../../serv/pets.service';
import { Pet } from '../../model/pet';
import { OnInit } from '@angular/core';
import { AppointmentsService } from '../../serv/appointments.service';
import { MatDialog } from '@angular/material/dialog';
import { QrDialogComponent } from '../../dialog/qr-dialog/qr-dialog.component';

@Component({
  selector: 'app-appointment-card',
  standalone: true,
  imports: [],
  templateUrl: './appointment-card.component.html',
  styleUrl: './appointment-card.component.scss',
})
export class AppointmentCardComponent implements OnInit {
  @Input() appointment!: Appointment;
  pet!: Pet;

  constructor(
    private petsService: PetsService,
    private appointmentService: AppointmentsService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.petsService.getPet(this.appointment.petId).subscribe((pet) => {
      this.pet = pet;
    });
  }

  cancelAppointment(id: string) {
    this.appointmentService.cancelAppointment(id).subscribe(() => {});
  }

  openQRCodeDialog(id: string) {
    this.dialog.open(QrDialogComponent, {
      data: { id },
    });
  }
}
