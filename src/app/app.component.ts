import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { WeatherDisplayComponent } from './components/weather-display/weather-display.component';

interface WeatherDisplayData {
  time: string;
  values: {
    temperature: number;
    humidity: number;
    cloudCover: number;
    precipitationProbability: number;
    windSpeed: number;
    pressureSeaLevel?: number;
  };
  location: {
    name: string;
  };
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, SearchBarComponent, WeatherDisplayComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Weather MVP';
  currentLocation: string = '';

  onLocationSearch(location: string) {
    this.currentLocation = location;
  }
}
