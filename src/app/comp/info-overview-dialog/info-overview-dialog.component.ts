import { Component } from '@angular/core';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
} from '@angular/material/dialog';
import { Inject } from '@angular/core';
import { Appointment } from '../../model/appointment';

@Component({
  selector: 'app-info-overview-dialog',
  standalone: true,
  imports: [
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
  ],
  templateUrl: './info-overview-dialog.component.html',
  styleUrl: './info-overview-dialog.component.scss',
})
export class InfoOverviewDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<InfoOverviewDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Appointment
  ) {}
}
