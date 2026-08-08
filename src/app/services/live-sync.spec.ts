import { TestBed } from '@angular/core/testing';

import { LiveSync } from './live-sync';

describe('LiveSync', () => {
  let service: LiveSync;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LiveSync);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
