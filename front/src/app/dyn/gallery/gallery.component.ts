import { Component, EventEmitter, Output } from '@angular/core';
import { PetsService } from '../../serv/pets.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Pet } from '../../model/pet';
import { Router, RouterModule } from '@angular/router';
import { routes } from '../../app.routes';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SearchComponent } from '../../comp/search/search.component';
import { NavbarComponent } from '../../comp/navbar/navbar.component';
import { FooterComponent } from '../../comp/footer/footer.component';
import { Auth } from '@angular/fire/auth';
import { MatDialog } from '@angular/material/dialog';
import { GatekeeperDialogComponent } from '../../dialog/gatekeeper-dialog/gatekeeper-dialog.component';

@Component({
  selector: 'app-gallery',
  standalone: true,
  imports: [
    HttpClientModule,
    RouterModule,
    FormsModule,
    CommonModule,
    SearchComponent,
    NavbarComponent,
    FooterComponent,
  ],
  templateUrl: './gallery.component.html',
  styleUrl: './gallery.component.scss',
  providers: [HttpClient],
})
export class GalleryComponent {
  pets: Pet[] = [];

  selectedType: string = 'all';
  searchTerm: string = '';

  updateSelectedType(selectedType: string) {
    this.selectedType = selectedType;
  }

  constructor(
    private petsService: PetsService,
    private auth: Auth,
    private router: Router,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.petsService.getPets().subscribe((pets) => {
      this.pets = pets;
    });
  }

  trackById(index: number, pet: Pet) {
    return pet.id;
  }

  adopt(id: number) {
    if (this.auth.currentUser) {
      this.router.navigate(['/pet-details', id]);
      return;
    }

    this.dialog.open(GatekeeperDialogComponent, {});
  }
}
