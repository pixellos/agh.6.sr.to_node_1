import { TestBed } from '@angular/core/testing';

import { DataGeneratorService } from './data-generator.service';

describe('DataHolderService', () => {
  let service: DataGeneratorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataGeneratorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
