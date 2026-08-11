import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { EnrollmentFormComponent } from './enrollment-form';

describe('EnrollmentFormComponent', () => {
  let component: EnrollmentFormComponent;
  let fixture: ComponentFixture<EnrollmentFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, EnrollmentFormComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(EnrollmentFormComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
