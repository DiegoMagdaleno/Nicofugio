import { TestBed } from '@angular/core/testing';

import { LectorPantallaService } from './lector-pantalla.service';

describe('LectorPantallaService', () => {
  let service: LectorPantallaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LectorPantallaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
