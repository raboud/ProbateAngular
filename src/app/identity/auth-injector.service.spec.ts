import { TestBed, inject } from '@angular/core/testing';

import { AuthInjectorService } from './auth-injector.service';

describe('AuthInjectorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthInjectorService]
    });
  });

  it('should be created', inject([AuthInjectorService], (service: AuthInjectorService) => {
    expect(service).toBeTruthy();
  }));
});
