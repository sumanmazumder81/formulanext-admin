import { TestBed } from '@angular/core/testing';

import { OwnerListService } from './owner-list.service';

describe('OwnerListService', () => {
  let service: OwnerListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OwnerListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
