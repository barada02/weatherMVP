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
  template: `
    <div class="weather-container" *ngIf="weatherData">
      <div class="weather-header">
        <h2>Current Weather</h2>
        <p class="time">{{ weatherData.time | date:'medium' }}</p>
      </div>
      <div class="weather-grid">
        <div class="weather-item" *ngIf="weatherData.values.temperature !== undefined">
          <span class="label">Temperature</span>
          <span class="value">{{ weatherData.values.temperature }}°C</span>
        </div>
        <div class="weather-item" *ngIf="weatherData.values.humidity !== undefined">
          <span class="label">Humidity</span>
          <span class="value">{{ weatherData.values.humidity }}%</span>
        </div>
        <div class="weather-item" *ngIf="weatherData.values.cloudCover !== undefined">
          <span class="label">Cloud Cover</span>
          <span class="value">{{ weatherData.values.cloudCover }}%</span>
        </div>
        <div class="weather-item" *ngIf="weatherData.values.precipitationProbability !== undefined">
          <span class="label">Precipitation</span>
          <span class="value">{{ weatherData.values.precipitationProbability }}%</span>
        </div>
        <div class="weather-item" *ngIf="weatherData.values.windSpeed !== undefined">
          <span class="label">Wind Speed</span>
          <span class="value">{{ weatherData.values.windSpeed }} m/s</span>
        </div>
        <div class="weather-item" *ngIf="weatherData.values.pressureSeaLevel !== undefined">
          <span class="label">Pressure</span>
          <span class="value">{{ weatherData.values.pressureSeaLevel }} hPa</span>
        </div>
      </div>
    </div>
    <div class="error-message" *ngIf="error">
      {{ error }}
    </div>
  `,
  styles: [`
    .weather-container {
      background: white;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      padding: 20px;
      margin: 20px;
      max-width: 800px;
      margin: 20px auto;
    }
    .weather-header {
      text-align: center;
      margin-bottom: 20px;
    }
    .weather-header h2 {
      margin: 0;
      color: #333;
    }
    .time {
      color: #666;
      margin: 5px 0;
    }
    .weather-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 20px;
    }
    .weather-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 15px;
      background: #f8f9fa;
      border-radius: 6px;
    }
    .label {
      font-size: 14px;
      color: #666;
      margin-bottom: 5px;
    }
    .value {
      font-size: 24px;
      font-weight: bold;
      color: #333;
    }
    .error-message {
      color: #dc3545;
      text-align: center;
      padding: 20px;
      margin: 20px;
    }
  `]
})
export class WeatherDisplayComponent {
  @Input() weatherData: WeatherData | null = null;
  @Input() error: string | null = null;
}
