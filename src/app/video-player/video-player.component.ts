import { Item } from './../../interfaces/videos';
import { MetaService } from './../service/meta.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-video-player',
  templateUrl: './video-player.component.html',
  styleUrls: ['./video-player.component.scss']
})
export class VideoPlayerComponent implements OnInit {

  video: Item;
  videoUrl;

  constructor(
    private activatedRoute: ActivatedRoute,
    private sanitizer: DomSanitizer,
    private meta: MetaService,
    private router: Router
  ) { }

  ngOnInit() {
    this.activatedRoute.data
      .subscribe((data) => {
        this.video = data[0].items[0];
        this.videoUrl = this.sanitizer.bypassSecurityTrustHtml(this.video.player.embedHtml);

        this.meta.generateTags({
          title: 'Video: ' + this.video.snippet.title,
          description: this.video.snippet.description,
          image: this.video.snippet.thumbnails.high.url || this.video.snippet.thumbnails.default.url,
          slug: 'video/' + this.video.id
        });
      });

  }

  goBack() {
    this.router.navigate(['']);
    // cant use: this.location.back(); :(
  }

}
