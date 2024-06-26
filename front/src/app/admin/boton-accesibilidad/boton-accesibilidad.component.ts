import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AccesibilidadService } from './accesibilidad.service';

@Component({
  selector: 'app-boton-accesibilidad',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './boton-accesibilidad.component.html',
  styleUrl: './boton-accesibilidad.component.scss'
})
export class BotonAccesibilidadComponent {
  isOpen = false;

  constructor (public accesibilidad: AccesibilidadService) {}

 
 toggleButtons() {
  this.isOpen = !this.isOpen;
 }

 toggleUnderLineLinks(){
  this.accesibilidad.setUnderlineLinks(!this.accesibilidad.getUnderlineLinks());
 }
 toggleScreenReader(){
  this.accesibilidad.setScreenReader(!this.accesibilidad.getScreenReader());
 }
 toggleLargeFont(){
  this.accesibilidad.setLargeFont(!this.accesibilidad.getLargeFont());
 }
 toggleHighContrast(){
  this.accesibilidad.setHighContrast(!this.accesibilidad.getHighContrast());
 }
}
