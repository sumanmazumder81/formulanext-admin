import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OwnerVehiclesComponent } from './owner-vehicles.component';

describe('OwnerVehiclesComponent', () => {
  let component: OwnerVehiclesComponent;
  let fixture: ComponentFixture<OwnerVehiclesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OwnerVehiclesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OwnerVehiclesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
