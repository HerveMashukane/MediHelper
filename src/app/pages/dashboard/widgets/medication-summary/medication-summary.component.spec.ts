import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicationSummaryComponent } from './medication-summary.component';

describe('MedicationSummaryComponent', () => {
  let component: MedicationSummaryComponent;
  let fixture: ComponentFixture<MedicationSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MedicationSummaryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MedicationSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
