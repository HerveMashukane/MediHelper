import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppointmentsFormComponent } from './appointments-form.component';

describe('AppointmentsFormComponent', () => {
  let component: AppointmentsFormComponent;
  let fixture: ComponentFixture<AppointmentsFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppointmentsFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppointmentsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
