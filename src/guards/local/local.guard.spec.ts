import { Reflector } from '@nestjs/core';
import { LocalAuthGuard } from './local.guard';

describe('LocalAuthGuard', () => {
  it('should be defined', () => {
    expect(new LocalAuthGuard(new Reflector())).toBeDefined();
  });
});
