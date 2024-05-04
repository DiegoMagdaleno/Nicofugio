import { Routes } from '@angular/router';
import { GalleryComponent } from './dyn/gallery/gallery.component';
import { PetDetailsComponent } from './comp/pet-details/pet-details.component';
import { AppointmentsComponent } from './dyn/appointments/appointments.component';

export const routes: Routes = [
  {
    path: 'gallery',
    component: GalleryComponent,
  },
  {
    path: 'pet-details/:id',
    component: PetDetailsComponent,
  },
  {
    path: 'appointments',
    component: AppointmentsComponent,
  }
];
