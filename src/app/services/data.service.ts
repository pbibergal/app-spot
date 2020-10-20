import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { API_URL, ARTIST_ID } from '../constants';
import { ArtistResponse } from '../interfaces/artist';

@Injectable({
  providedIn: 'root',
})
export class DataService {

  constructor(private http: HttpClient) {
  }

  fetchArtists(id: string): Observable<ArtistResponse> {
    return this.http.get<ArtistResponse>(`${API_URL}/artists/${id}`);
  }

  fetchAlbums(artistId: string, offset: number): Observable<any> {
    return this.http.get(`${API_URL}/artists/${artistId}/albums?offset=${offset}`);
  }
}
