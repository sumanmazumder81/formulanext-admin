import { TestBed } from '@angular/core/testing';

import { OwnerAddService } from './owner-add.service';

describe('OwnerAddService', () => {
  let service: OwnerAddService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OwnerAddService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
