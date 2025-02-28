import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';

export interface WeatherData {
  city: string;
  temperature: number;
  description: string;
  humidity: number;
  windSpeed: number;
  precipitation: number;
  cloudCover: number;
}

export interface TomorrowApiResponse {
  data: {
    time: string;
    values: {
      temperature: number;
      humidity: number;
      windSpeed: number;
      precipitationProbability: number;
      cloudCover: number;
    };
  };
  location: {
    name: string;
  };
}

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  constructor(private http: HttpClient) { }

  private apiKey = environment.tomorrowIoApiKey;
  private apiUrl = 'https://api.tomorrow.io/v4/weather/realtime';

  getWeatherData(city: string): Observable<WeatherData | null> {
    const headers = new HttpHeaders().set('apikey', this.apiKey);
    const params = new HttpParams()
      .set('location', city)
      .set('units', 'metric');

    return this.http.get<TomorrowApiResponse>(this.apiUrl, { headers, params }).pipe(
      map(response => {
        if (!response || !response.data || !response.data.values) {
          return null;
        }

        return {
          city: city,
          temperature: response.data.values.temperature,
          description: this.getWeatherDescription(
            response.data.values.cloudCover,
            response.data.values.precipitationProbability
          ),
          humidity: response.data.values.humidity,
          windSpeed: response.data.values.windSpeed,
          precipitation: response.data.values.precipitationProbability,
          cloudCover: response.data.values.cloudCover
        };
      }),
      catchError(error => {
        console.error('Error fetching weather:', error);
        return of(null);
      })
    );
  }

  private getWeatherDescription(cloudCover: number, precipitationProbability: number): string {
    if (precipitationProbability > 50) {
      return 'Rainy';
    } else if (cloudCover > 70) {
      return 'Cloudy';
    } else if (cloudCover > 30) {
      return 'Partly Cloudy';
    } else {
      return 'Clear';
    }
  }
}
