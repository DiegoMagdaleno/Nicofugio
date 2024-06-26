import { Component } from '@angular/core';
import { AccesibilidadService } from '../../admin/boton-accesibilidad/accesibilidad.service';
import { BotonAccesibilidadComponent } from '../../admin/boton-accesibilidad/boton-accesibilidad.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [BotonAccesibilidadComponent, CommonModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
  constructor(public accesibilidad: AccesibilidadService){}
}
