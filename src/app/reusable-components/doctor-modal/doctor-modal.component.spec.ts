import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorModalComponent } from './doctor-modal.component';

describe('DoctorModalComponent', () => {
  let component: DoctorModalComponent;
  let fixture: ComponentFixture<DoctorModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DoctorModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DoctorModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
