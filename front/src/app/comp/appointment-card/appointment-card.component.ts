import { Component, Input } from '@angular/core';
import { Appointment } from '../../model/appointment';
import { PetsService } from '../../serv/pets.service';
import { Pet } from '../../model/pet';
import { OnInit } from '@angular/core';

@Component({
  selector: 'app-appointment-card',
  standalone: true,
  imports: [],
  templateUrl: './appointment-card.component.html',
  styleUrl: './appointment-card.component.scss',
})
export class AppointmentCardComponent implements OnInit {
  @Input() appointment!: Appointment;
  pet!: Pet;

  constructor(private petsService: PetsService) {}

  ngOnInit() {
    this.petsService.getPet(this.appointment.petId).subscribe(pet => {
      this.pet = pet;
    });
  }
}