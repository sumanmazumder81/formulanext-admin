import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrokerCreateComponent } from './broker-create.component';

describe('BrokerCreateComponent', () => {
  let component: BrokerCreateComponent;
  let fixture: ComponentFixture<BrokerCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BrokerCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BrokerCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
