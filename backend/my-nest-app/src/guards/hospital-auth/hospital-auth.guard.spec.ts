import { HospitalAuthGuard } from './hospital-auth.guard';

describe('HospitalAuthGuard', () => {
  it('should be defined', () => {
    expect(new HospitalAuthGuard()).toBeDefined();
  });
});
