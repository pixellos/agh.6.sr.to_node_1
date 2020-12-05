import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteButtonCartComponent } from './delete-button-cart.component';

describe('DeleteButtonCartComponent', () => {
  let component: DeleteButtonCartComponent;
  let fixture: ComponentFixture<DeleteButtonCartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteButtonCartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteButtonCartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
