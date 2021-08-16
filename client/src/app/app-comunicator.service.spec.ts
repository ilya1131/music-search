import { TestBed } from '@angular/core/testing';

import { AppComunicatorService } from './app-comunicator.service';

describe('AppComunicatorService', () => {
  let service: AppComunicatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AppComunicatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
