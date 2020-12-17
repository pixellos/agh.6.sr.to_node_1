import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComplaintProcessComponent } from './complaint-process.component';

describe('ComplaintProcessComponent', () => {
  let component: ComplaintProcessComponent;
  let fixture: ComponentFixture<ComplaintProcessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComplaintProcessComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ComplaintProcessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
