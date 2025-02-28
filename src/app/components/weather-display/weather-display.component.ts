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
