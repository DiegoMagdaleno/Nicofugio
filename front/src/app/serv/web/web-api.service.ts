import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WebAPIService {
  constructor(private http: HttpClient) {}

  get(url: string): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache',
        'Pragma': 'no-cache',
      }),
      observe: 'response' as 'body',
    };

    return this.http.get(url, httpOptions).pipe(
      map((response: any) => this._returnResponseData(response)),
      catchError(this._handleError)
    );
  }

  post(url: string, model: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      observe: 'response' as 'body',
    };
    return this.http.post(url, model, httpOptions).pipe(map((response: any) => this._returnResponseData(response)), catchError(this._handleError));
  }

  put(url: string, model: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      observe: 'response' as 'body',
    };
    return this.http.put(url, model, httpOptions).pipe(map((response: any) => this._returnResponseData(response)), catchError(this._handleError));
  }

  delete(url: string): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      observe: 'response' as 'body',
    };
    return this.http.delete(url, httpOptions).pipe(map((response: any) => this._returnResponseData(response)), catchError(this._handleError));
  }

  private _returnResponseData(response: any): any {
    return response.body;
  }

  private _handleError(error: any) {
    return throwError(error);
  }
}
