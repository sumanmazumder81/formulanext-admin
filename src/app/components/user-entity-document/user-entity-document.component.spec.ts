import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserEntityDocumentComponent } from './user-entity-document.component';

describe('UserEntityDocumentComponent', () => {
  let component: UserEntityDocumentComponent;
  let fixture: ComponentFixture<UserEntityDocumentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserEntityDocumentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserEntityDocumentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
