import { Component } from '@angular/core';
import { MatDialogRef, MatDialogClose, MatDialogContent, MatDialogTitle } from '@angular/material/dialog';
import { SecureDomPipe } from '../../pipe/secure-dom.pipe';

@Component({
  selector: 'app-youtube-video-dialog',
  standalone: true,
  imports: [
    MatDialogTitle,
    MatDialogContent,
    MatDialogClose,
    SecureDomPipe
  ],
  templateUrl: './youtube-video-dialog.component.html',
  styleUrl: './youtube-video-dialog.component.scss'
})
export class YoutubeVideoDialogComponent {
  video = "X9QxvAaf_kY";

  constructor(
    public dialogRef: MatDialogRef<YoutubeVideoDialogComponent>,
  ) {}
}
