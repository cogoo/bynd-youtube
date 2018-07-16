import { MetaService } from './../service/meta.service';
import { YoutubeService } from './../service/youtube.service';
import { Component, OnInit } from '@angular/core';
import { Item } from '../../interfaces/videos';
import {
  trigger,
  state,
  style,
  animate,
  transition,
  query,
  stagger
} from '@angular/animations';
import { BehaviorSubject } from 'rxjs';
import { tap, take } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [
    trigger('listAnimation', [
      transition('* => *', [
        query('.video-wrapper', style({ opacity: 0, transform: 'scale(0.7)' }), { optional: true }),
        query('.video-wrapper',
          stagger('100ms', [
            animate('300ms', style({ opacity: 1, transform: 'scale(1)' }))
          ]), { optional: true })
      ])
    ])
  ]
})

export class HomeComponent implements OnInit {

  // videos: Item[] = [];


  videos$ = new BehaviorSubject([]);
  private _batch = 10;
  private _pageToken: string;
  private _endOfFeed = false;
  private _playlistID = 'PLl-K7zZEsYLlTSrObc8GxDLarH7tF9WeW';

  constructor(
    private yt: YoutubeService,
    private meta: MetaService
  ) { }

  ngOnInit() {

    this.meta.generateTags({});
    this.getPlaylist();

  }

  private getPlaylist(pageToken?: string) {

    if (this._endOfFeed) {
      return;
    }

    this.yt.getPlaylist(this._playlistID, pageToken)
      .pipe(
        tap((videos: any) => {
          console.log(videos);
          const newVideos = videos.items.slice(0, this._batch);
          const currentVideos = this.videos$.getValue();
          if (!videos.nextPageToken) {
            this._endOfFeed = true;
          } else {
            this._pageToken = videos.nextPageToken;
          }

          this._batch += 10;
          this.videos$.next([...currentVideos, ...newVideos]);
        }),
        take(1)
      )
      .subscribe();
  }

  onScroll() {
    if (!this._endOfFeed) {
      this.getPlaylist(this._pageToken);
    }
  }

}
