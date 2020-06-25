import { TestBed } from '@angular/core/testing';

import { XkcdSearchService } from './xkcd-search.service';

describe('XkcdSearchService', () => {
  let service: XkcdSearchService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(XkcdSearchService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
