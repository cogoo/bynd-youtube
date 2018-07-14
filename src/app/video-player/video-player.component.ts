import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '../../../node_modules/@angular/router';
import { DomSanitizer } from '../../../node_modules/@angular/platform-browser';

@Component({
  selector: 'app-video-player',
  templateUrl: './video-player.component.html',
  styleUrls: ['./video-player.component.scss']
})
export class VideoPlayerComponent implements OnInit {

  video;
  videoUrl;

  constructor(
    private location: Location,
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit() {
    this.route.data
      .subscribe((data) => {
        this.video = data[0].items[0];
        // I know  :( .. I should make this into a pipe
        this.videoUrl = this.sanitizer.bypassSecurityTrustHtml(this.video.player.embedHtml);
        console.log('this.video: ', this.video);
      });
  }

  goBack() {
    this.location.back();
  }

}
