import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

interface WeatherData {
  time: string;
  values: {
    temperature?: number;
    humidity?: number;
    cloudCover?: number;
    precipitationProbability?: number;
    pressureSeaLevel?: number;
    windSpeed?: number;
    windDirection?: number;
  };
}

@Component({
  selector: 'app-weather-display',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './weather-display.component.html',
  styleUrls: ['./weather-display.component.css']
})
export class WeatherDisplayComponent {
  @Input() weatherData: WeatherData | null = null;
  @Input() error: string | null = null;
}
