import { TestBed, inject } from '@angular/core/testing';

import { YoutubeService } from './youtube.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('YoutubeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [YoutubeService]
    });
  });

  it('should be created', inject([YoutubeService], (service: YoutubeService) => {
    expect(service).toBeTruthy();
  }));
});
