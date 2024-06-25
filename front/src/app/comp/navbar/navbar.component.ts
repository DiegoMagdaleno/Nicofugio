import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { RouterLink } from '@angular/router';
import { AppointmentsDialogComponent } from '../../dialog/appointments-dialog/appointments-dialog.component';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  userDetails: { displayName: string } = { displayName: '' };
  isDropdownOpen: boolean = false;

  constructor(
    public auth: Auth,
    private router: Router,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.auth.onAuthStateChanged((user) => {
      if (user) {
        this.userDetails.displayName = user.displayName || 'User';
      }
    });
  }

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  logout() {
    this.auth.signOut().then(() => {
      this.router.navigate(['/']);
      this.isDropdownOpen = false;
    });
  }

  openAppointmentsDialog() {
    this.dialog.open(AppointmentsDialogComponent, {});
  }
}
