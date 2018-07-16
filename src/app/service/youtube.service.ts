import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class YoutubeService {

  // private _basePlaylistUrl = 'https://www.googleapis.com/youtube/v3/playlistItems?part=snippet,contentDetails,status&maxResults=10&key=AIzaSyCuv_16onZRx3qHDStC-FUp__A6si-fStw&playlistId=';
  private _baseVideoUrl = 'https://www.googleapis.com/youtube/v3/videos?part=player,snippet&key=AIzaSyCuv_16onZRx3qHDStC-FUp__A6si-fStw&id=';

  constructor(
    private http: HttpClient
  ) {

  }

  getVideo(videoID: string) {
    return this.http.get(this._baseVideoUrl + videoID);
  }

  getPlaylist(playlistID: string, pageToken: string = '') {
    const _basePlaylistUrl = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet,contentDetails,status&maxResults=10&key=AIzaSyCuv_16onZRx3qHDStC-FUp__A6si-fStw&playlistId=${playlistID}&pageToken=${pageToken}`;

    return this.http.get(_basePlaylistUrl);
    // .pipe(
    //   map((res: any) => {
    //     // only interested in the items property, so map it down
    //     return res.items;
    //   })
    // );
  }
}
