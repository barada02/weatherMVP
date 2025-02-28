import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent {
  searchQuery: string = '';
  @Output() searchLocation = new EventEmitter<string>();

  onSearch() {
    if (this.searchQuery.trim()) {
      this.searchLocation.emit(this.searchQuery.trim());
    }
  }
}
