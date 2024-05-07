import { Component } from '@angular/core';
import { NavbarComponent } from '../../comp/navbar/navbar.component';
import { FooterComponent } from '../../comp/footer/footer.component';

@Component({
  selector: 'app-events',
  standalone: true,
  imports: [NavbarComponent,FooterComponent],
  templateUrl: './events.component.html',
  styleUrl: './events.component.scss'
})
export class EventsComponent {

}
