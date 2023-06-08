import { TestBed } from '@angular/core/testing';

import { LicenceClassService } from './licence-class.service';

describe('LicenceClassService', () => {
  let service: LicenceClassService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LicenceClassService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
