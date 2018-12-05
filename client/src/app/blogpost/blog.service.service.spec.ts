import { TestBed } from '@angular/core/testing';

import { Blog.ServiceService } from './blog.service.service';

describe('Blog.ServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: Blog.ServiceService = TestBed.get(Blog.ServiceService);
    expect(service).toBeTruthy();
  });
});
