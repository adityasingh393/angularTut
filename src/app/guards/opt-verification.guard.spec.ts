import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { optVerificationGuard } from './opt-verification.guard';

describe('optVerificationGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => optVerificationGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
