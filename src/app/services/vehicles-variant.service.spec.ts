import { TestBed } from '@angular/core/testing';

import { VehiclesVariantService } from './vehicles-variant.service';

describe('VehiclesVariantService', () => {
  let service: VehiclesVariantService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VehiclesVariantService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
