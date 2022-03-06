import { TestBed } from '@angular/core/testing';

import { ProfileCanActivateGuard } from './profile.guard';

describe('ProfileGuard', () => {
  let guard: ProfileCanActivateGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(ProfileCanActivateGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
