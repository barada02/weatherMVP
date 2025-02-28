import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [FormsModule],
  template: `
    <div class="search-container">
      <input
        type="text"
        [(ngModel)]="location"
        (keyup.enter)="onSearch()"
        placeholder="Enter location..."
        class="search-input"
      />
      <button (click)="onSearch()" class="search-button">Search</button>
    </div>
  `,
  styles: [`
    .search-container {
      display: flex;
      gap: 10px;
      margin: 20px;
      justify-content: center;
    }
    .search-input {
      padding: 10px;
      border: 1px solid #ccc;
      border-radius: 4px;
      width: 300px;
      font-size: 16px;
    }
    .search-button {
      padding: 10px 20px;
      background-color: #007bff;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-size: 16px;
    }
    .search-button:hover {
      background-color: #0056b3;
    }
  `]
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
