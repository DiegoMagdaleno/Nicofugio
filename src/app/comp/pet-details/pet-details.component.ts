import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Pet } from '../../model/pet';
import { PetsService } from '../../serv/pets.service';
import { AppointmentComponent } from '../appointment/appointment.component';

@Component({
  selector: 'app-pet-details',
  standalone: true,
  imports: [AppointmentComponent],
  templateUrl: './pet-details.component.html',
  styleUrl: './pet-details.component.css'
})
export class PetDetailsComponent {
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
      });
    });
  }
}

