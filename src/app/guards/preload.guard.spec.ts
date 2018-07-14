import { TestBed, async, inject } from '@angular/core/testing';

import { PreloadGuard } from './preload.guard';
import { HttpClientModule } from '../../../node_modules/@angular/common/http';

describe('PreloadGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [PreloadGuard]
    });
  });

  it('should ...', inject([PreloadGuard], (guard: PreloadGuard) => {
    expect(guard).toBeTruthy();
  }));
});
