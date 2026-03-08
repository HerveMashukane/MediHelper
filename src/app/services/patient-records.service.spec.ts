import { TestBed } from '@angular/core/testing';

import { PatientRecordsService } from './patients.service';

describe('PatientRecordsService', () => {
  let service: PatientRecordsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PatientRecordsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
