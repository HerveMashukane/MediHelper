import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientsFormComponent } from './patients-form.component';

describe('PatientsFormComponent', () => {
  let component: PatientsFormComponent;
  let fixture: ComponentFixture<PatientsFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PatientsFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PatientsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
