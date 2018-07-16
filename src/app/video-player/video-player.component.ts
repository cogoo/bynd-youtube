import { Item } from './../../interfaces/videos';
import { MetaService } from './../service/meta.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-video-player',
  templateUrl: './video-player.component.html',
  styleUrls: ['./video-player.component.scss']
})
export class VideoPlayerComponent implements OnInit, OnDestroy {

  video: Item;
  videoUrl: SafeHtml;
  private destroys$ = new Subject();

  constructor(
    private activatedRoute: ActivatedRoute,
    private sanitizer: DomSanitizer,
    private meta: MetaService,
    private router: Router
  ) { }

  ngOnInit() {
    this.activatedRoute.data
      .pipe(
        takeUntil(this.destroys$)
      )
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

  ngOnDestroy() {
    this.destroys$.next(true);
    this.destroys$.unsubscribe();
  }

  goBack() {
    this.router.navigate(['']);
    // cant use: this.location.back(); :(
  }

}
