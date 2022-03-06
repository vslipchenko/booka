import { TestBed } from '@angular/core/testing';

import { ProfileCanLoadGuard } from './profile.guard';

describe('ProfileGuard', () => {
  let guard: ProfileCanLoadGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(ProfileCanLoadGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
