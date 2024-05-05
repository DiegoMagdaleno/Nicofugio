import { Component, EventEmitter, Output } from '@angular/core';
import { PetsService } from '../../serv/pets.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Pet } from '../../model/pet';
import { RouterModule } from '@angular/router';
import { routes } from '../../app.routes';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SearchComponent } from '../../comp/search/search.component';
import { NavbarComponent } from '../../comp/navbar/navbar.component';

@Component({
  selector: 'app-gallery',
  standalone: true,
  imports: [HttpClientModule, RouterModule, FormsModule, CommonModule, SearchComponent, NavbarComponent],
  templateUrl: './gallery.component.html',
  styleUrl: './gallery.component.css',
  providers: [HttpClient],
})
export class GalleryComponent {
  pets: Pet[] = [];

  selectedType: string = 'all';
  searchTerm: string = '';	

  updateSelectedType(selectedType: string) {
    this.selectedType = selectedType;
  }

  constructor(private petsService: PetsService) {}

  ngOnInit(): void {
    this.petsService.getPets().subscribe(pets => {
      this.pets = pets;
    });
  }

  trackById(index: number, pet: Pet) {
    return pet.id;
  }
}
