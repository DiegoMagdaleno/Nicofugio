import { Component } from '@angular/core';
import { NavbarComponent } from '../../comp/navbar/navbar.component';
import { FooterComponent } from '../../comp/footer/footer.component';
import { EventsComponent } from '../events/events.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NavbarComponent, FooterComponent, EventsComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
