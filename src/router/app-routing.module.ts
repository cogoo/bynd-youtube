import { PreloadGuard } from './../app/guards/preload.guard';
import { VideoPlayerComponent } from './../app/video-player/video-player.component';
import { HomeComponent } from './../app/home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'video/:videoID', component: VideoPlayerComponent, resolve: [PreloadGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
