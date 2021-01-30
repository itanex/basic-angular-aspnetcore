import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { tap, catchError, publishReplay, refCount } from 'rxjs/operators';
import { Weather } from './weather';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  private httpHeaders = {
    headers: new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
  };

  constructor(
    private httpClient: HttpClient
  ) { }

  getForcast(): Observable<Weather[]> {
    const url = `https://localhost:5001/WeatherForecast`;

    return this.getItems<Weather>(url);
  }

  private getItem<T>(url: string): Observable<T> {
    const headers = this.httpHeaders;

    return this.httpClient.get<T>(url, headers)
      .pipe(
        // tap(data => console.log('DatabaseService::GetItem', url, data)),
        catchError(this.handleError)
      )
  }

  private getItems<T>(url: string): Observable<T[]> {
    const headers = this.httpHeaders;

    return this.httpClient.get<T[]>(url, headers)
      .pipe(
        // tap(data => console.log('DatabaseService::GetItems', url, data)),
        catchError(this.handleError)
      )
  }

  private handleError(error: any) {
    console.log(error);
    return throwError(error);
  }
}
