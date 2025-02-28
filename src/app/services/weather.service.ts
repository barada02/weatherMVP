import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  private readonly API_KEY = 'jyEodjqRRldYkRohEGaoEgiXLN9A61pW';
  private readonly BASE_URL = 'https://api.tomorrow.io/v4/weather';

  constructor(private http: HttpClient) { }

  /**
   * Get real-time weather data for a specific location
   * @param location - Location name or coordinates
   * @returns Observable with weather data
   */
  getRealTimeWeather(location: string): Observable<any> {
    const url = `${this.BASE_URL}/realtime`;
    const params = {
      location,
      apikey: this.API_KEY
    };

    return this.http.get(url, { params });
  }

  /**
   * Get weather forecast data for a specific location
   * @param location - Location name or coordinates
   * @returns Observable with forecast data
   */
  getForecast(location: string): Observable<any> {
    const url = `${this.BASE_URL}/forecast`;
    const params = {
      location,
      apikey: this.API_KEY
    };

    return this.http.get(url, { params });
  }
}
