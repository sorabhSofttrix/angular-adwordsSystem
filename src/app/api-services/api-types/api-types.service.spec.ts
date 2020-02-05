import { TestBed } from '@angular/core/testing';

import { ApiTypesService } from './api-types.service';

describe('ApiTypesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ApiTypesService = TestBed.get(ApiTypesService);
    expect(service).toBeTruthy();
  });
});
