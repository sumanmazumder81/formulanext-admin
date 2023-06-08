import { TestBed } from '@angular/core/testing';

import { VehiclesTypeService } from './vehicles-type.service';

describe('TypeEntityService', () => {
  let service: VehiclesTypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VehiclesTypeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
