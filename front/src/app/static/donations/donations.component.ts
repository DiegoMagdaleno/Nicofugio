import { Component } from '@angular/core';
import { NavbarComponent } from '../../comp/navbar/navbar.component';
import { FooterComponent } from '../../comp/footer/footer.component';
import { BotonAccesibilidadComponent } from '../../admin/boton-accesibilidad/boton-accesibilidad.component';
import { AccesibilidadService } from '../../admin/boton-accesibilidad/accesibilidad.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-donations',
  standalone: true,
  imports: [NavbarComponent, FooterComponent, BotonAccesibilidadComponent, CommonModule],
  templateUrl: './donations.component.html',
  styleUrl: './donations.component.scss'
})
export class DonationsComponent {
 constructor(public accesibilidad: AccesibilidadService){
 }
}
