import { TestBed } from '@angular/core/testing';

import { PostUserEntityManagerService } from './post-user-entity-manager.service';

describe('PostUserEntityManagerService', () => {
  let service: PostUserEntityManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PostUserEntityManagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
