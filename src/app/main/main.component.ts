import { Component, NgZone, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { asyncScheduler, of, Subject } from 'rxjs';
import { DataService } from '../services/data.service';
import { ARTIST_ID, SELECTED_ALBUM } from '../constants';
import { catchError, filter, map, takeUntil } from 'rxjs/operators';
import { FormBuilder, FormControl } from '@angular/forms';
import { Album, AlbumResponse, AlbumResponseItem } from '../interfaces/album';
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  albums: any[] = [];
  control: FormControl;
  disableScroll = false;
  offset = 0;
  filteredAlbums: any[] = [];
  selectedAlbum: Album;

  private destroy: Subject<void> = new Subject();

  constructor(
    private dataService: DataService,
    private authService: AuthService,
    private router: Router,
    private fb: FormBuilder,
    private storageService: StorageService,
    private zone: NgZone,
  ) {
    this.control = fb.control('');

    if (this.storageService.isItemExists(SELECTED_ALBUM)) {
      this.selectedAlbum = JSON.parse(this.storageService.getItem(SELECTED_ALBUM));
      this.control.setValue(this.selectedAlbum.name);
    }
  }

  ngOnInit(): void {
    this.fetchData(this.offset);
  }

  fetchData(offset): void {
    this.disableScroll = true;
    this.dataService.fetchAlbums(ARTIST_ID, offset)
      .pipe(
        takeUntil(this.destroy),
        catchError(async () => {
          this.authService.logout();
          await this.router.navigate(['login']);
          return of(null);
        }),
        filter(d => !!d),
        map((data: AlbumResponse) => data.items),
      )
      .subscribe((data: AlbumResponseItem[]) => {
        this.zone.runOutsideAngular(() => {
          const albums: Album[] = data.map(d => {
            return { id: d.id, thumbnail: d.images[2].url, image: d.images[0].url, name: d.name, release_date: d.release_date };
          });

          this.zone.run(() => {
            this.albums = this.albums.concat(albums);
            this.disableScroll = false;
          });
        });
      });
  }

  async logout(): Promise<void> {
    this.authService.logout();
    await this.router.navigate(['/login']);
  }

  selectRow(item: Album): void {
    this.selectedAlbum = item;
    this.storageService.setItem(SELECTED_ALBUM, JSON.stringify(this.selectedAlbum));
  }

  reachedBottom(): void {
    this.offset++;
    asyncScheduler.schedule(() => {
      this.fetchData(this.offset);
    }, 100);
  }
}
