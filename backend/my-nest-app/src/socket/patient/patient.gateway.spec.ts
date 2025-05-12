import { Test, TestingModule } from '@nestjs/testing';
import { PatientGateway } from './patient.gateway';

describe('PatientGateway', () => {
  let gateway: PatientGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PatientGateway],
    }).compile();

    gateway = module.get<PatientGateway>(PatientGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
