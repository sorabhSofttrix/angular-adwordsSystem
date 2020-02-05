import { TestBed } from '@angular/core/testing';

import { NonAuthGuardService } from './non-auth-guard.service';

describe('NonAuthGuardService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NonAuthGuardService = TestBed.get(NonAuthGuardService);
    expect(service).toBeTruthy();
  });
});
