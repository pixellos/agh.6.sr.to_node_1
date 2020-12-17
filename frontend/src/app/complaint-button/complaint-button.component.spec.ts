import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComplaintButtonComponent } from './complaint-button.component';

describe('ComplaintButtonComponent', () => {
  let component: ComplaintButtonComponent;
  let fixture: ComponentFixture<ComplaintButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComplaintButtonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ComplaintButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
