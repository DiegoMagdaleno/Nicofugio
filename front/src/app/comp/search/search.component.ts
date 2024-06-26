import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BotonAccesibilidadComponent } from '../../admin/boton-accesibilidad/boton-accesibilidad.component';
import { AccesibilidadService } from '../../admin/boton-accesibilidad/accesibilidad.service';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [FormsModule, CommonModule, BotonAccesibilidadComponent],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss'
})
export class SearchComponent {
  @Output() search: EventEmitter<string> = new EventEmitter<string>();

  searchText: string = '';

  constructor( public accesibilidad: AccesibilidadService) {}

  onSearch() {
    this.search.emit(this.searchText);
  }
}
