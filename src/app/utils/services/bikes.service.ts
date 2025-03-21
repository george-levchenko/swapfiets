import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Bike } from '../../models/bike.interface';

@Injectable({ providedIn: 'root' })
export class BikesService {
  private readonly http = inject(HttpClient);

  private readonly apiUrlBase = 'https://bikeindex.org/api/v3';

  getBikesByCity(city: string): Observable<{ bikes: Bike[] }> {
    const params = new HttpParams()
      .append('stolenness', 'proximity') // API requirement
      .append('location', city);

    return this.http.get<{ bikes: Bike[] }>(`${this.apiUrlBase}/search`, { params });
  }

  getBikeDetails(id: number): Observable<{ bike: Bike }> {
    return this.http.get<{ bike: Bike }>(`${this.apiUrlBase}/bikes/${id}`);
  }
}
