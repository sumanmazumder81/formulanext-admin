import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListOfTableComponent } from './list-of-table.component';

describe('ListOfTableComponent', () => {
  let component: ListOfTableComponent;
  let fixture: ComponentFixture<ListOfTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListOfTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListOfTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
