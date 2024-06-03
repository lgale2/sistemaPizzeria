import { TestBed } from '@angular/core/testing';

import { AuthTsService } from './auth.ts.service';

describe('AuthTsService', () => {
  let service: AuthTsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthTsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
