import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardSummaryComponent } from './dashboard-summary.component';

describe('DashboardSummaryComponent', () => {
  let component: DashboardSummaryComponent;
  let fixture: ComponentFixture<DashboardSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardSummaryComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardSummaryComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
