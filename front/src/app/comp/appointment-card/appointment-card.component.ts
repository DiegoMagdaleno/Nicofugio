import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Appointment } from '../../model/appointment';
import { PetsService } from '../../serv/pets.service';
import { Pet } from '../../model/pet';
import { OnInit } from '@angular/core';
import { AppointmentsService } from '../../serv/appointments.service';
import { MatDialog } from '@angular/material/dialog';
import { QrDialogComponent } from '../../dialog/qr-dialog/qr-dialog.component';
import { ConfirmDeleteDialogComponent } from '../../dialog/confirm-delete-dialog/confirm-delete-dialog.component';

@Component({
  selector: 'app-appointment-card',
  standalone: true,
  imports: [],
  templateUrl: './appointment-card.component.html',
  styleUrl: './appointment-card.component.scss',
})
export class AppointmentCardComponent implements OnInit {
  @Input() appointment!: Appointment;
  @Output() appointmentDeleted: EventEmitter<void> = new EventEmitter<void>();
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
    const confirm = this.dialog.open(ConfirmDeleteDialogComponent);

    confirm.afterClosed().subscribe((result) => {
      if (result) {
        this.appointmentService.cancelAppointment(id).subscribe(() => {
          this.appointmentDeleted.emit();
        });
      } else {
        console.log('Canceled');
      }
    })
  }

  openQRCodeDialog(id: string) {
    this.dialog.open(QrDialogComponent, {
      data: { appointmentId: id },
    });
  }
}
