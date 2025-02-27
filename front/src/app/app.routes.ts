import { Routes } from '@angular/router';
import { GalleryComponent } from './dyn/gallery/gallery.component';
import { PetDetailsComponent } from './comp/pet-details/pet-details.component';
import { HomeComponent } from './static/home/home.component';
import { AboutComponent } from './static/about/about.component';
import { DonationsComponent } from './static/donations/donations.component';
import { ContactComponent } from './static/contact/contact.component';
import { EventsComponent } from './static/events/events.component';
import { LoginComponent } from './auth/login/login.component';
import { SignUpComponent } from './auth/sign-up/sign-up.component';
import { HomeComponent as AdminHomeComponent } from './admin/home/home.component';
import { FaqComponent } from './static/faq/faq.component';


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
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'signup',
    component: SignUpComponent
  },
  {
    path: 'admin-panel',
    component: AdminHomeComponent
  },
  {
    path: 'faq',
    component: FaqComponent
  },
];
