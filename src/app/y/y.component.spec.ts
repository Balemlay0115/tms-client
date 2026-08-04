import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YComponent } from './y.component';

describe('YComponent', () => {
  let component: YComponent;
  let fixture: ComponentFixture<YComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [YComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(YComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
