import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrandEntitiesComponent } from './brand-entities.component';

describe('BrandEntitiesComponent', () => {
  let component: BrandEntitiesComponent;
  let fixture: ComponentFixture<BrandEntitiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BrandEntitiesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BrandEntitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
