import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OwnerViewDetailsComponent } from './owner-view-details.component';

describe('OwnerViewDetailsComponent', () => {
  let component: OwnerViewDetailsComponent;
  let fixture: ComponentFixture<OwnerViewDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OwnerViewDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OwnerViewDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
