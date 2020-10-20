import { Component, OnDestroy, OnInit } from '@angular/core';
import { ARTIST_ID } from '../constants';
import { Subject } from 'rxjs';
import { DataService } from '../services/data.service';
import { Artist, ArtistResponse } from '../interfaces/artist';
import { map, takeUntil } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-artist',
  templateUrl: './artist.component.html',
  styleUrls: ['./artist.component.scss'],
})
export class ArtistComponent implements OnInit, OnDestroy {
  artist: Artist;
  private destroy: Subject<void> = new Subject();

  constructor(
    private dataService: DataService,
    private authService: AuthService,
    private router: Router,
  ) {
  }

  ngOnInit(): void {
    this.fetchData();
  }

  ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
  }

  fetchData(): void {
    this.dataService.fetchArtists(ARTIST_ID)
      .pipe(
        takeUntil(this.destroy),
        map((data: ArtistResponse) => {
          const artist: Artist = { name: data.name, image: data.images[0], genres: data.genres };
          return artist;
        }),
      )
      .subscribe(data => {
        this.artist = data;
      }, (err) => {
        if (err.status === '401') {
          this.authService.logout();
          this.router.navigate(['login']);
        }
      });
  }
}
