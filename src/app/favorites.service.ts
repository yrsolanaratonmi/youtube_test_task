import { Injectable } from '@angular/core';
import {Video} from './video.dto';
import {BehaviorSubject, of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {

  constructor() { }

  favorites$ = new BehaviorSubject<Video[]>([])

  getFavorites() {
    const favorites = new Array()
    for (let key in localStorage) {
      if (localStorage.hasOwnProperty(key)) {
        const value = localStorage.getItem(key)
        if (value) favorites.push(JSON.parse(value))
      }
    }
    this.favorites$.next(favorites)
  }

  addFavorite(video: Video) {
    localStorage.setItem(video.id, JSON.stringify(video))
    this.favorites$.next([...this.favorites$.getValue(), video])
  }

  removeFavorite(itemId: string) {
    localStorage.removeItem(itemId)
    const newFavorites = new Array()
    for (let key in localStorage) {
      if (localStorage.hasOwnProperty(key)) {
        const value = localStorage.getItem(key)
        if (value) newFavorites.push(JSON.parse(value))
      }
    }
    this.favorites$.next(newFavorites)
  }
}
