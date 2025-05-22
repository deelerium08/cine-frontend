import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';


@Injectable({ providedIn: 'root' })
export class MoviesService {
  private baseUrl = 'http://localhost:3000/movies';

  constructor(private http: HttpClient, private auth: AuthService) { }

  private getHeaders() {
    return {
      headers: new HttpHeaders({
        Authorization: `Bearer ${this.auth.getToken()}`
      })
    };
  }

  getNowPlaying(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/now-playing`, this.getHeaders());
  }

  getPopular(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/popular`, this.getHeaders());
  }

  getCredits(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/${id}/credits`, this.getHeaders());
  }
}
