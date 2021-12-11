import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonGroupControlComponent } from './button-group-control.component';

describe('ButtonGroupControlComponent', () => {
  let component: ButtonGroupControlComponent;
  let fixture: ComponentFixture<ButtonGroupControlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ButtonGroupControlComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ButtonGroupControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
