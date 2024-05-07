import { Component } from '@angular/core';
import { NavbarComponent } from '../../comp/navbar/navbar.component';
import { FooterComponent } from '../../comp/footer/footer.component';
import { Router } from '@angular/router';
import { YoutubeVideoDialogComponent } from '../../comp/youtube-video-dialog/youtube-video-dialog.component';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NavbarComponent, FooterComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  constructor(
    private router: Router,
    public dialog: MatDialog
  ) {}

  goToPets() {
    this.router.navigate(['/gallery']);
  }
  
  openVideo() {
    const dialogRef = this.dialog.open(YoutubeVideoDialogComponent)
  }
}
