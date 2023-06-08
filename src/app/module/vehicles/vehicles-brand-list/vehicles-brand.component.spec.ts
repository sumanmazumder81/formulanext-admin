import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehiclesBrandComponent } from './vehicles-brand.component';

describe('VehiclesBrandComponent', () => {
  let component: VehiclesBrandComponent;
  let fixture: ComponentFixture<VehiclesBrandComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VehiclesBrandComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VehiclesBrandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
