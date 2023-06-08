import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicleEntitiesComponent } from './vehicle-entities.component';

describe('VehicleEntitiesComponent', () => {
  let component: VehicleEntitiesComponent;
  let fixture: ComponentFixture<VehicleEntitiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VehicleEntitiesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VehicleEntitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
