import { Test, TestingModule } from '@nestjs/testing';
import { PateintService } from './pateint.service';

describe('PateintService', () => {
  let service: PateintService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PateintService],
    }).compile();

    service = module.get<PateintService>(PateintService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
