import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehiclesVariantComponent } from './vehicles-variant.component';

describe('VehiclesVariantComponent', () => {
  let component: VehiclesVariantComponent;
  let fixture: ComponentFixture<VehiclesVariantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VehiclesVariantComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VehiclesVariantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
