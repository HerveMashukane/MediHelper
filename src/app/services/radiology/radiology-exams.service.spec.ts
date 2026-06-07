import { TestBed } from '@angular/core/testing';

import { RadiologyExamsService } from './radiology-exams.service';

describe('RadiologyExamsService', () => {
  let service: RadiologyExamsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RadiologyExamsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
