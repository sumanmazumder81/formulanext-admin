import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehiclesTypeComponent } from './vehicles-type.component';

describe('VehiclesTypeComponent', () => {
  let component: VehiclesTypeComponent;
  let fixture: ComponentFixture<VehiclesTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VehiclesTypeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VehiclesTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
