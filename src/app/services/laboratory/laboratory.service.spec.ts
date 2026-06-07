import { TestBed } from '@angular/core/testing';

import { LaboratoryService } from './laboratory.service';

describe('LaboratoryService', () => {
  let service: LaboratoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LaboratoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
