import { YoutubeService } from './../service/youtube.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PreloadGuard implements Resolve<any> {

  constructor(
    private yt: YoutubeService
  ) { }

  resolve(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {

    const videoID = next.paramMap.get('videoID');

    return this.yt.getVideo(videoID);
  }

}
