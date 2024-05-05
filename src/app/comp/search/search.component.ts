import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent {
  @Output() search: EventEmitter<string> = new EventEmitter<string>();

  searchText: string = '';

  constructor() {}

  onSearch() {
    this.search.emit(this.searchText);
  }
}
