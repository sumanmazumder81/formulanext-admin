import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LicenceClassListComponent } from './licence-class-list.component';

describe('LicenceClassListComponent', () => {
  let component: LicenceClassListComponent;
  let fixture: ComponentFixture<LicenceClassListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LicenceClassListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LicenceClassListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
