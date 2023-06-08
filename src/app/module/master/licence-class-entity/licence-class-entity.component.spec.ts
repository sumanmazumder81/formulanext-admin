import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LicenceClassEntityComponent } from './licence-class-entity.component';

describe('LicenceClassEntityComponent', () => {
  let component: LicenceClassEntityComponent;
  let fixture: ComponentFixture<LicenceClassEntityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LicenceClassEntityComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LicenceClassEntityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
