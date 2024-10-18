import { TestBed } from '@angular/core/testing';

import { NotificationServices } from './notification.service';

describe('NotificationService', () => {
  let service: NotificationServices;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NotificationServices);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
