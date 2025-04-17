import { patientGuard } from './patient.guard';

describe('patientGuard', () => {
  it('should be defined', () => {
    expect(new patientGuard()).toBeDefined();
  });
});
