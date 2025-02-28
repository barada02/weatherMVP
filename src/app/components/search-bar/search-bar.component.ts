import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent {
  location: string = '';
  @Output() searchLocation = new EventEmitter<string>();

  onSearch() {
    if (this.location.trim()) {
      this.searchLocation.emit(this.location.trim());
    }
  }
}
