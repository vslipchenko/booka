import {TestBed} from '@angular/core/testing';

import {EmployerConfirmationService} from './employer-confirmation.service';

describe('EmployerConfirmationService', () => {
  let service: EmployerConfirmationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmployerConfirmationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
