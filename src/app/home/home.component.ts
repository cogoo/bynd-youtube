import { MetaService } from './../service/meta.service';
import { YoutubeService } from './../service/youtube.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Item } from '../../interfaces/videos';
import {
  trigger,
  style,
  animate,
  transition,
  query,
  stagger
} from '@angular/animations';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [
    trigger('listAnimation', [
      transition('* => *', [
        query(':enter', style({ opacity: 0, transform: 'scale(0.7)' }), { optional: true }),
        query(':enter',
          stagger('100ms', [
            animate('300ms', style({ opacity: 1, transform: 'scale(1)' }))
          ]), { optional: true })
      ])
    ])
  ]
})

export class HomeComponent implements OnInit, OnDestroy {

  videos: Item[] = [];
  private _pageToken: string;
  private _endOfFeed = false;
  private _playlistID = 'PLl-K7zZEsYLlTSrObc8GxDLarH7tF9WeW';
  private destroys$ = new Subject();

  constructor(
    private yt: YoutubeService,
    private meta: MetaService
  ) { }

  ngOnInit() {

    this.meta.generateTags({});
    this.getPlaylist();

  }

  ngOnDestroy() {
    this.destroys$.next(true);
    this.destroys$.unsubscribe();
  }

  private getPlaylist(pageToken?: string) {

    if (this._endOfFeed) {
      return;
    }

    this.yt.getPlaylist(this._playlistID, pageToken)
      .pipe(
        takeUntil(this.destroys$)
      )
      .subscribe((videos: any) => {
        this.videos = [...this.videos, ...videos.items];
        if (videos.nextPageToken) {
          this._pageToken = videos.nextPageToken;
        } else {
          this._endOfFeed = true;
        }
      });

  }

  onScroll() {
    if (!this._endOfFeed) {
      this.getPlaylist(this._pageToken);
    }
  }

}
