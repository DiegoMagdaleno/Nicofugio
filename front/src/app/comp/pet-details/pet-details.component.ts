import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Pet } from '../../model/pet';
import { PetsService } from '../../serv/pets.service';
import { AppointmentComponent } from '../appointment/appointment.component';
import { Input } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-pet-details',
  standalone: true,
  imports: [AppointmentComponent, NavbarComponent, FooterComponent],
  templateUrl: './pet-details.component.html',
  styleUrl: './pet-details.component.scss'
})
export class PetDetailsComponent {
  @Input() petId: number = 0;
  pet: Pet = {
    id: 0,
    name: '',
    species: '',
    breed: '',
    age: 0,
    description: '',
    imageUrl: '',
    weight: 0,
    length: 0
  };

  constructor(private route: ActivatedRoute, private petsService: PetsService) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.petsService.getPet(+params['id']).subscribe(pet => {
        this.pet = pet;
        this.petId = pet.id;
      });
    });
  }
}

