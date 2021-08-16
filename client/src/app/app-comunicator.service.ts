import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class AppComunicatorService {
  url = 'http://localhost:8000';
  constructor(private http: HttpClient) { }

  search (query: string) {
    const params = new HttpParams()
      .set('searchQuery', query);

    return this.http.get<any>(`${this.url}/search`, { params });
  }
}
