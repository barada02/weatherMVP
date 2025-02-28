import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { WeatherDisplayComponent } from './components/weather-display/weather-display.component';
import { WeatherService } from './services/weather.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, SearchBarComponent, WeatherDisplayComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
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
