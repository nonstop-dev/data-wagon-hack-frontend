import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';
import { Observable } from 'rxjs';
import { IPageParams, ISearchParams, IStation, IWagon } from './types';

@Injectable({
  providedIn: 'root',
})
export class MainService {
  constructor(private readonly http: HttpClient) {}

  private readonly url = environment.apiUrl;

  getStations(paramsObject?: IPageParams): Observable<IStation[]> {
    const params = new HttpParams({ fromObject: paramsObject });
    return this.http.get<IStation[]>(this.url + '/stations', { params: params });
  }

  getStationById(id: number | string): Observable<IStation> {
    return this.http.get<IStation>(this.url + `/stations/${id}`);
  }

  getWagons(paramsObject?: IPageParams): Observable<IWagon[]> {
    const params = new HttpParams({ fromObject: paramsObject });
    return this.http.get<IWagon[]>(this.url + `/wagons`, { params: params });
  }

  searchStations(paramsObject?: ISearchParams): Observable<IStation[]> {
    const params = new HttpParams({ fromObject: paramsObject });
    return this.http.get<IStation[]>(this.url + '/stations/search', { params: params });
  }
}
