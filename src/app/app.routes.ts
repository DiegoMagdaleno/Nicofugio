import { Routes } from '@angular/router';
import { GalleryComponent } from './dyn/gallery/gallery.component';
import { PetDetailsComponent } from './comp/pet-details/pet-details.component';
import { AppointmentsComponent } from './dyn/appointments/appointments.component';
import { HomeComponent } from './static/home/home.component';
import { AboutComponent } from './static/about/about.component';
import { DonationsComponent } from './static/donations/donations.component';
import { ContactComponent } from './static/contact/contact.component';
import { EventsComponent } from './static/events/events.component';


export const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
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
  },
  {
    path: 'about',
    component: AboutComponent,
  },
  {
    path: 'donations',
    component: DonationsComponent,
  },
  {
    path: 'contact',
    component: ContactComponent,

  },
  {
    path: 'events',
    component: EventsComponent
  }
];
