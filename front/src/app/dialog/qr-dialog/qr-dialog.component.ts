import { Component, Inject, OnInit, Input } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { QRCodeModule } from 'angularx-qrcode';
import { WebAPIService } from '../../serv/web/web-api.service';

@Component({
  selector: 'app-qr-dialog',
  standalone: true,
  imports: [MatDialogContent, MatDialogTitle, MatDialogActions, QRCodeModule],
  templateUrl: './qr-dialog.component.html',
  styleUrl: './qr-dialog.component.scss',
})
export class QrDialogComponent implements OnInit{
  @Input() appoinmentId!: string;
  baseURL: string = "http://localhost:3000/";
  qrCodeValue: string = "";

  constructor(
    private dialogRef: MatDialogRef<QrDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private web: WebAPIService
  ) {}

  ngOnInit(): void {
      this.web.get(`${this.baseURL}/appointments/qr/${this.data.appointmentId}`).subscribe((res: any) => {
        this.qrCodeValue = res.qr;
      });
  }
}
