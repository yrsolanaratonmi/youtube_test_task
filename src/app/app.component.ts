import {Component} from '@angular/core';
import {YoutubeService} from './youtube.service';
import {FormControl} from '@angular/forms';
import {Observable, BehaviorSubject, Subject, combineLatest} from 'rxjs';
import {map, startWith, debounceTime, distinctUntilChanged, tap} from 'rxjs/operators';
import {Video, YoutubeApiResponse} from './video.dto';
import {FavoritesService} from './favorites.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  searchInput = new FormControl();
  videos$ = new Observable<Video[]>();
  searchValue$ = new BehaviorSubject<string>('');
  nextPageToken: string = '';
  isShowFavorites$ = new BehaviorSubject(false)
  favorites$ = new Observable<Video[]>()


  constructor(private youtube: YoutubeService, private favoritesService: FavoritesService) { }


  ngOnInit(): void {
    this.favorites$ = this.favoritesService.favorites$
    this.loadNext()
  }

  loadNext() {
    this.videos$ = combineLatest([
      this.searchInput.valueChanges.pipe(
        startWith(''),
        debounceTime(500),
        distinctUntilChanged(),
      ),
      this.youtube.getTopVideos(this.nextPageToken).pipe(
        map((response: YoutubeApiResponse) => {
          this.nextPageToken = response.nextPageToken
          return response
        }),
        map((youtubeResponse) => youtubeResponse.items)
      )
    ]).pipe(
      map(([value, videos]: [string, Array<Video>]) => {
        if (value.trim() === '') {
          return videos;
        } else {
          return videos.filter((video: Video) =>
            video.snippet.title.toLowerCase().includes(value.toLowerCase())
          );
        }
      })
    )
  }

  showFavorites() {
    this.isShowFavorites$.next(true)
  }

  hideFavorites() {
    this.isShowFavorites$.next(false)
  }
}
