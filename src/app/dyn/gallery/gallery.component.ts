import { Component } from '@angular/core';
import { PetsService } from '../../serv/pets.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Pet } from '../../model/pet';
import { RouterModule } from '@angular/router';
import { routes } from '../../app.routes';

@Component({
  selector: 'app-gallery',
  standalone: true,
  imports: [HttpClientModule, RouterModule],
  templateUrl: './gallery.component.html',
  styleUrl: './gallery.component.css',
  providers: [HttpClient],
})
export class GalleryComponent {
  pets: Pet[] = [];
  constructor(private petsService: PetsService) {}

  ngOnInit(): void {
    this.petsService.getPets().subscribe(pets => {
      this.pets = pets;
    });
  }
}
