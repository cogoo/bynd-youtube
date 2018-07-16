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

  videos: Item[];

  constructor(
    private yt: YoutubeService,
    private meta: MetaService
  ) { }

  ngOnInit() {

    this.meta.generateTags({});
    this.getPlaylist('PLo12SYwt93SRKKGVT3oMejfgjBo2yBhBq');

  }

  getPlaylist(playlistID: string) {

    this.yt.getPlaylist(playlistID)
      .subscribe((videos: any) => {
        this.videos = videos;
      });

  }


}
