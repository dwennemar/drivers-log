import { TestBed } from '@angular/core/testing';

import { MilDataService } from './mil-data.service';

describe('MilDataService', () => {
  let service: MilDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MilDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
