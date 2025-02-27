import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { RouterLink } from '@angular/router';
import { AppointmentsDialogComponent } from '../../dialog/appointments-dialog/appointments-dialog.component';
import { AuthService } from '../../serv/auth/auth.service';
import { BotonAccesibilidadComponent } from '../../admin/boton-accesibilidad/boton-accesibilidad.component';
import { AccesibilidadService } from '../../admin/boton-accesibilidad/accesibilidad.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, CommonModule, BotonAccesibilidadComponent],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  userDetails: { displayName: string } = { displayName: '' };
  isDropdownOpen: boolean = false;
  isAdmin: boolean = false;
  isMobileMenuOpen: boolean = false;

  constructor(
    public accesibilidad: AccesibilidadService,
    public auth: Auth,
    private router: Router,
    private dialog: MatDialog,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.auth.onAuthStateChanged(async (user) => {
      if (user) {
        this.userDetails.displayName = user.displayName || 'User';
        this.isAdmin = await this.authService.checkUserIsAdmin(user.uid);
      }
    });
  }

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  logout() {
    this.auth.signOut().then(() => {
      this.router.navigate(['/']);
      this.isDropdownOpen = false;
      this.isMobileMenuOpen = false;
    });
  }

  openAppointmentsDialog() {
    this.dialog.open(AppointmentsDialogComponent, {
      width: '80%'
    });
  }
}
