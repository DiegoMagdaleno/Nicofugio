import { Component, Inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';

@Component({
  selector: 'app-qr-dialog',
  standalone: true,
  imports: [MatDialogContent, MatDialogTitle, MatDialogActions],
  templateUrl: './qr-dialog.component.html',
  styleUrl: './qr-dialog.component.scss',
})
export class QrDialogComponent {
  constructor(
    private dialogRef: MatDialogRef<QrDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}
}
