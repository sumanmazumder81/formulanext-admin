import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeEntitiesComponent } from './type-entities.component';

describe('TypeEntitiesComponent', () => {
  let component: TypeEntitiesComponent;
  let fixture: ComponentFixture<TypeEntitiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TypeEntitiesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TypeEntitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
