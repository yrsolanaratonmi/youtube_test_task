import {HttpClient, HttpParams} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable, tap} from 'rxjs';
import {YoutubeApiResponse} from './video.dto';
import {environent} from 'environment';

@Injectable({
  providedIn: 'root'
})
export class YoutubeService {

  constructor(private http: HttpClient) { }


  getTopVideos(nextPageToken: string = ''): Observable<YoutubeApiResponse> {

    const params = new HttpParams()
    .set('maxResults', 48)
    .set('key', environent.apiKey)
    .set('chart', 'mostPopular')
    .set('pageToken', nextPageToken)
    .set('part', 'snippet')
    return this.http.get<YoutubeApiResponse>('https://youtube.googleapis.com/youtube/v3/videos', {params})
  }
}
