import { MetaService } from './../service/meta.service';
import { YoutubeService } from './../service/youtube.service';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { of } from 'rxjs';
import { DebugElement } from '../../../node_modules/@angular/core';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let ytSpy = jasmine.createSpy();
  let metaSpy = jasmine.createSpy();
  let ytService: YoutubeService;
  let metaService: MetaService;
  let de: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        InfiniteScrollModule,
        HttpClientTestingModule,
        BrowserAnimationsModule,
        RouterTestingModule],
      declarations: [HomeComponent],
      providers: []
    })
      .compileComponents();
  }));

  beforeEach(() => {

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    de = fixture.debugElement;
    ytService = de.injector.get(YoutubeService);
    metaService = de.injector.get(MetaService);

    ytSpy = spyOn(ytService, 'getPlaylist').and.returnValue(of('Playlist called'));
    metaSpy = spyOn(metaService, 'generateTags').and.returnValue(of('generate meta called'));

    fixture.detectChanges();

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call getPlaylist once and update the view', () => {
    expect(ytSpy).toHaveBeenCalled();
    expect(ytSpy.calls.all().length).toEqual(1);
  });

  it('should call generate tags once and update the metatags', () => {
    expect(metaSpy).toHaveBeenCalled();
    expect(metaSpy.calls.all().length).toEqual(1);
  });
});

