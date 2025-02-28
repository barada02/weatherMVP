import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { WeatherDisplayComponent } from './components/weather-display/weather-display.component';
import { WeatherService } from './services/weather.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, SearchBarComponent, WeatherDisplayComponent],
  template: `
    <div class="app-container">
      <h1>Weather MVP</h1>
      <app-search-bar (searchLocation)="onSearchLocation($event)"></app-search-bar>
      <app-weather-display 
        [weatherData]="weatherData" 
        [error]="error">
      </app-weather-display>
    </div>
  `,
  styles: [`
    .app-container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 20px;
    }
    h1 {
      text-align: center;
      color: #333;
      margin-bottom: 20px;
    }
  `]
})
export class AppComponent {
  weatherData: any = null;
  error: string | null = null;

  constructor(private weatherService: WeatherService) {}

  onSearchLocation(location: string) {
    this.error = null;
    this.weatherData = null;
    
    this.weatherService.getRealTimeWeather(location).subscribe({
      next: (response) => {
        this.weatherData = response.data;
      },
      error: (err) => {
        this.error = 'Failed to fetch weather data. Please try again.';
        console.error('Weather API Error:', err);
      }
    });
  }
}
