import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodaysMedicationComponent } from './todays-medication.component';

describe('TodaysMedicationComponent', () => {
  let component: TodaysMedicationComponent;
  let fixture: ComponentFixture<TodaysMedicationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TodaysMedicationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TodaysMedicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
