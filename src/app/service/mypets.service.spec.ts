import { TestBed } from '@angular/core/testing';

import { MypetsService } from './mypets.service';

describe('MypetsService', () => {
  let service: MypetsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MypetsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
