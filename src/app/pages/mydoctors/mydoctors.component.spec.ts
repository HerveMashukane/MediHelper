import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MydoctorsComponent } from './mydoctors.component';

describe('MydoctorsComponent', () => {
  let component: MydoctorsComponent;
  let fixture: ComponentFixture<MydoctorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MydoctorsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MydoctorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
