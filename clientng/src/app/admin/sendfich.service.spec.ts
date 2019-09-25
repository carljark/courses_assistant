import { TestBed, inject } from '@angular/core/testing';

import { SendfichService } from './sendfich.service';

describe('SendfichService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SendfichService]
    });
  });

  it('should be created', inject([SendfichService], (service: SendfichService) => {
    expect(service).toBeTruthy();
  }));
});
