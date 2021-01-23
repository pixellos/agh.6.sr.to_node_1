import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RefundButtonComponent } from './refund-button.component';

describe('RefundButtonComponent', () => {
  let component: RefundButtonComponent;
  let fixture: ComponentFixture<RefundButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RefundButtonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RefundButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
