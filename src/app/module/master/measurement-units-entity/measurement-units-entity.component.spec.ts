import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeasurementUnitsEntityComponent } from './measurement-units-entity.component';

describe('MeasurementUnitsEntityComponent', () => {
  let component: MeasurementUnitsEntityComponent;
  let fixture: ComponentFixture<MeasurementUnitsEntityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MeasurementUnitsEntityComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MeasurementUnitsEntityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
