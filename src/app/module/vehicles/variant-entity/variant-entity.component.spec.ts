import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VariantEntityComponent } from './variant-entity.component';

describe('VariantEntityComponent', () => {
  let component: VariantEntityComponent;
  let fixture: ComponentFixture<VariantEntityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VariantEntityComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VariantEntityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
