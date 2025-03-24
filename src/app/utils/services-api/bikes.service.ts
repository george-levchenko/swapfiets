import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Bike } from '../../models/interfaces/bike.interface';
import { environment } from '../../../environments/environment.dev';

@Injectable({ providedIn: 'root' })
export class BikesService {
  private readonly http = inject(HttpClient);

  private readonly baseApi = environment.baseApi;

  getBikesByCity(city: string): Observable<{ bikes: Bike[] }> {
    const params = new HttpParams()
      .append('stolenness', 'proximity') // API requirement
      .append('location', city);

    return this.http.get<{ bikes: Bike[] }>(`${this.baseApi}/search`, { params });
  }

  getBikeDetails(id: number): Observable<{ bike: Bike }> {
    return this.http.get<{ bike: Bike }>(`${this.baseApi}/bikes/${id}`);
  }
}
