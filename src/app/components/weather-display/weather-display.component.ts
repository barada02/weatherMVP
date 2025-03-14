import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WeatherService, WeatherData } from '../../services/weather.service';

@Component({
  selector: 'app-weather-display',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './weather-display.component.html',
  styleUrls: ['./weather-display.component.css']
})
export class WeatherDisplayComponent implements OnChanges {
  @Input() location: string = '';
  weatherData: WeatherData | null = null;
  errorMessage: string = '';

  constructor(private weatherService: WeatherService) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['location'] && this.location) {
      this.getWeatherData();
    }
  }

  getWeatherIcon(description: string): string {
    const desc = description.toLowerCase();
    if (desc.includes('clear') || desc.includes('sunny')) {
      return 'fas fa-sun';
    } else if (desc.includes('cloud')) {
      if (desc.includes('scattered') || desc.includes('broken')) {
        return 'fas fa-cloud-sun';
      }
      return 'fas fa-cloud';
    } else if (desc.includes('rain')) {
      if (desc.includes('light')) {
        return 'fas fa-cloud-rain';
      }
      return 'fas fa-cloud-showers-heavy';
    } else if (desc.includes('thunder')) {
      return 'fas fa-bolt';
    } else if (desc.includes('snow')) {
      return 'fas fa-snowflake';
    } else if (desc.includes('mist') || desc.includes('fog')) {
      return 'fas fa-smog';
    }
    return 'fas fa-cloud'; // default icon
  }

  private getWeatherData() {
    this.weatherService.getWeatherData(this.location).subscribe({
      next: (data) => {
        if (data) {
          this.weatherData = data;
          this.errorMessage = '';
        } else {
          this.errorMessage = 'No weather data available for this location';
          this.weatherData = null;
        }
      },
      error: (error) => {
        this.errorMessage = 'Error fetching weather data. Please try again.';
        this.weatherData = null;
      }
    });
  }
}
