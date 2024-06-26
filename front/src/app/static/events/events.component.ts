import { Component } from '@angular/core';
import { NavbarComponent } from '../../comp/navbar/navbar.component';
import { FooterComponent } from '../../comp/footer/footer.component';
import { BotonAccesibilidadComponent } from '../../admin/boton-accesibilidad/boton-accesibilidad.component';
import { CommonModule } from '@angular/common';
import { AccesibilidadService } from '../../admin/boton-accesibilidad/accesibilidad.service';

@Component({
  selector: 'app-events',
  standalone: true,
  imports: [NavbarComponent,FooterComponent, BotonAccesibilidadComponent, CommonModule],
  templateUrl: './events.component.html',
  styleUrl: './events.component.scss'
})
export class EventsComponent {
  constructor(public accesibilidad: AccesibilidadService){}
}
