import { TestBed } from '@angular/core/testing';

import { MeasurementUnitsService } from './measurement-units.service';

describe('MeasurementUnitsService', () => {
  let service: MeasurementUnitsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MeasurementUnitsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
