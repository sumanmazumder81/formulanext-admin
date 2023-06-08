import { TestBed } from '@angular/core/testing';

import { UserEntitiesService } from './user-entities.service';

describe('UserEntitiesService', () => {
  let service: UserEntitiesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserEntitiesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
