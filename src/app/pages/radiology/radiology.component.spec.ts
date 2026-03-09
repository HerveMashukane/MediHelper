import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RadiologyComponent } from './radiology.component';

describe('RadiologyComponent', () => {
  let component: RadiologyComponent;
  let fixture: ComponentFixture<RadiologyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RadiologyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RadiologyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
