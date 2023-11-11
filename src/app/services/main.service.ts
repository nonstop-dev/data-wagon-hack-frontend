import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class MainService {

  constructor(private readonly http: HttpClient) { }

  private readonly url = environment.apiUrl;

  getStations() {
    return this.http.get(this.url + '/stations' );
  }
}
