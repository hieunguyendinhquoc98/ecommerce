import { TestBed } from '@angular/core/testing';

import { Oauth2Interceptor } from './oauth2.interceptor';

describe('Oauth2Interceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      Oauth2Interceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: Oauth2Interceptor = TestBed.inject(Oauth2Interceptor);
    expect(interceptor).toBeTruthy();
  });
});
