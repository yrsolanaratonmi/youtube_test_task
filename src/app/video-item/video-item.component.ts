import { Component, Input } from '@angular/core';
import {Video} from '../video.dto';
import {BehaviorSubject} from 'rxjs';
import {FavoritesService} from '../favorites.service';

@Component({
  selector: 'app-video-item',
  templateUrl: './video-item.component.html',
  styleUrls: ['./video-item.component.scss']
})
export class VideoItemComponent {
  @Input() video: Video

  constructor(private favoritesService: FavoritesService) {}

  isLiked$ = new BehaviorSubject(false);

  ngOnInit(): void {
    this.checkIsLiked()
  }

  like(event: Event) {
    event.preventDefault()
    this.isLiked$.next(true)
    this.favoritesService.addFavorite(this.video)
  }

  removeLike(event: Event) {
    event.preventDefault()
    this.isLiked$.next(false)
    this.favoritesService.removeFavorite(this.video.id)
  }

  checkIsLiked() {
    if (localStorage.getItem(this.video.id)) {
      this.isLiked$.next(true)
    }
  }
}
